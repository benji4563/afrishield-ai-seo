// VIDEO → TRANSCRIPTION
// node scripts/transcribe.mjs <video> --id <recording-id> [--model medium.en] [--whisper-dir <path>]
// Writes public/recordings/<id>/{source.mp4, audio16k.wav, whisper-captions.json, transcript.txt}
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { downloadWhisperModel, installWhisperCpp, transcribe, toCaptions } from "@remotion/install-whisper-cpp";

const args = process.argv.slice(2);
const flag = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
const video = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1]?.startsWith("--") !== true);
const id = flag("id");
if (!video || !id) {
  console.error("Usage: node scripts/transcribe.mjs <video> --id <recording-id> [--model base.en|medium.en] [--whisper-dir path]");
  process.exit(1);
}
// medium.en handles accented English far better than base.en; base.en is the fast fallback.
const MODEL = flag("model", "medium.en");
const VERSION = "1.5.5";
const shared = path.resolve("..", "..", "whitehouse-visuals", "whisper.cpp");
const whisperPath = path.resolve(flag("whisper-dir", fs.existsSync(shared) ? shared : "whisper.cpp"));
const dir = path.resolve("public", "recordings", id);
fs.mkdirSync(dir, { recursive: true });

const source = path.join(dir, "source.mp4");
if (path.resolve(video) !== source) {
  try {
    fs.linkSync(path.resolve(video), source);
  } catch {
    fs.copyFileSync(path.resolve(video), source);
  }
}
// Phones often record HEVC, which Chrome can't decode during rendering. Make an H.264 edit proxy.
const codec = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=codec_name", "-of", "csv=p=0", source]).toString().trim();
const proxy = path.join(dir, "edit-proxy.mp4");
if (codec !== "h264" && !fs.existsSync(proxy)) {
  console.log(`[ffmpeg] source is ${codec}; creating H.264 edit proxy`);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", source, "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", proxy], { stdio: "inherit" });
}

const wav = path.join(dir, "audio16k.wav");
console.log("[ffmpeg] extracting 16 kHz mono audio");
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", source, "-ar", "16000", "-ac", "1", wav], { stdio: "inherit" });

if (!fs.existsSync(path.join(whisperPath, "main.exe")) && !fs.existsSync(path.join(whisperPath, "main"))) {
  console.log(`[whisper] installing whisper.cpp ${VERSION} → ${whisperPath}`);
  await installWhisperCpp({ to: whisperPath, version: VERSION });
}
await downloadWhisperModel({ model: MODEL, folder: whisperPath });
console.log(`[whisper] transcribing with ${MODEL}`);
const out = await transcribe({ model: MODEL, whisperPath, whisperCppVersion: VERSION, inputPath: wav, tokenLevelTimestamps: true });
const { captions } = toCaptions({ whisperCppOutput: out });
fs.writeFileSync(path.join(dir, "whisper-captions.json"), JSON.stringify(captions, null, 2));
fs.writeFileSync(path.join(dir, "transcript.txt"), captions.map((c) => c.text).join("").trim());
console.log(`Wrote ${captions.length} tokens → ${path.join(dir, "whisper-captions.json")}`);
