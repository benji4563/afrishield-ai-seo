import path from "node:path";
import fs from "node:fs";
import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";

const wav = "C:\\Users\\hp\\aiv.wav";
const outJson = path.join(process.cwd(), "public", "ai-visibility", "captions.json");

if (!fs.existsSync(wav)) {
  console.error("WAV missing:", wav);
  process.exit(1);
}

const out = await transcribe({
  model: "base.en",
  whisperPath: path.join(process.cwd(), "whisper.cpp"),
  whisperCppVersion: "1.5.5",
  inputPath: wav,
  tokenLevelTimestamps: true,
});
const { captions } = toCaptions({ whisperCppOutput: out });
fs.writeFileSync(outJson, JSON.stringify(captions, null, 2));
console.log("Wrote", captions.length, "tokens ->", outJson);
