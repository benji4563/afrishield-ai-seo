// Visual QA of the component library: one still per gallery component + a contact sheet.
// node scripts/render-gallery.mjs [--out out/gallery]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { browserExecutable } from "./lib/browser.mjs";

const outDir = path.resolve(process.argv.includes("--out") ? process.argv[process.argv.indexOf("--out") + 1] : "out/gallery");
fs.mkdirSync(outDir, { recursive: true });
console.log("[bundle] building…");
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "SignalEdit", inputProps: {}, browserExecutable });
const STEP_FRAMES = Math.round((2600 / 1000) * composition.fps);
const count = Math.round(composition.durationInFrames / STEP_FRAMES);
for (let i = 0; i < count; i++) {
  // Sample late in each component's window so entrance animations have finished.
  const frame = Math.min(composition.durationInFrames - 1, i * STEP_FRAMES + Math.round(STEP_FRAMES * 0.72));
  const output = path.join(outDir, `g${String(i).padStart(2, "0")}.jpg`);
  await renderStill({ composition, serveUrl, output, frame, imageFormat: "jpeg", jpegQuality: 85, scale: 0.4, browserExecutable });
  console.log(`component ${i + 1}/${count}`);
}
const sheet = path.join(outDir, "contact-sheet.jpg");
execFileSync("ffmpeg", ["-v", "error", "-y", "-framerate", "1", "-i", path.join(outDir, "g%02d.jpg"), "-vf", "tile=6x4:padding=8:color=0x14140F", "-frames:v", "1", "-q:v", "3", sheet], { stdio: "inherit" });
console.log(`Contact sheet → ${sheet}`);
