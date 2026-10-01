// Transcribe all VO clips to Remotion Caption JSON files.
// Run:  node scripts/transcribe.mjs
import path from "node:path";
import fs from "node:fs";
import { execSync } from "node:child_process";
import {
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
  toCaptions,
} from "@remotion/install-whisper-cpp";

const WHISPER_VERSION = "1.5.5";
const MODEL = "base.en";
const to = path.join(process.cwd(), "whisper.cpp");
const voDir = path.join(process.cwd(), "public", "VO2");
const outDir = path.join(process.cwd(), "public", "captions");

fs.mkdirSync(outDir, { recursive: true });

if (!fs.existsSync(path.join(to, "main.exe")) && !fs.existsSync(path.join(to, "main"))) {
  console.log(`[whisper] installing (v${WHISPER_VERSION}) into ${to}`);
  await installWhisperCpp({ to, version: WHISPER_VERSION });
} else {
  console.log(`[whisper] already installed at ${to}`);
}
console.log(`[whisper] downloading model ${MODEL}`);
await downloadWhisperModel({ model: MODEL, folder: to });

const beats = fs.readdirSync(voDir).filter((f) => /^beat\d+\.mp4$/.test(f)).sort();
for (const beat of beats) {
  const beatName = beat.replace(/\.mp4$/, "");
  const wav = path.join(voDir, `${beatName}.wav`);
  const inMp4 = path.join(voDir, beat);
  const outJson = path.join(outDir, `${beatName}.json`);
  if (fs.existsSync(outJson)) {
    console.log(`[skip] ${outJson} already exists`);
    continue;
  }
  console.log(`[convert] ${beat} -> ${beatName}.wav`);
  execSync(`ffmpeg -y -i "${inMp4}" -ar 16000 -ac 1 "${wav}"`, { stdio: "inherit" });
  console.log(`[transcribe] ${beat}`);
  const whisperCppOutput = await transcribe({
    model: MODEL,
    whisperPath: to,
    whisperCppVersion: WHISPER_VERSION,
    inputPath: wav,
    tokenLevelTimestamps: true,
  });
  const { captions } = toCaptions({ whisperCppOutput });
  fs.writeFileSync(outJson, JSON.stringify(captions, null, 2));
  console.log(`[done] ${outJson}  (${captions.length} caption tokens)`);
}
console.log("\nAll captions generated ✓");
