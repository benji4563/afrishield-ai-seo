// REMOTION EDIT → MP4 (or a still for review)
// node scripts/render-spec.mjs <public/specs/x.json> [--out out/x.mp4] [--still <ms>] [--scale 0.5] [--frames 0-299]
import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { browserExecutable } from "./lib/browser.mjs";

const args = process.argv.slice(2);
const flag = (k) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const specPath = args[0];
if (!specPath || specPath.startsWith("--")) {
  console.error("Usage: node scripts/render-spec.mjs <spec.json> [--out file] [--still ms] [--scale n] [--frames a-b]");
  process.exit(1);
}
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const inputProps = { spec };
console.log("[bundle] building…");
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "SignalEdit", inputProps, browserExecutable });
fs.mkdirSync(path.resolve("out"), { recursive: true });

if (flag("still") !== undefined) {
  const stills = String(flag("still")).split(",").map(Number);
  for (const ms of stills) {
    const frame = Math.min(composition.durationInFrames - 1, Math.round((ms / 1000) * composition.fps));
    const output = path.resolve(stills.length === 1 && flag("out") ? flag("out") : `${flag("out-dir") ?? "out"}/${spec.id}-${ms}ms.png`);
    await renderStill({ composition, serveUrl, output, frame, inputProps, scale: Number(flag("scale") ?? 1), browserExecutable });
    console.log(`Still → ${output}`);
  }
} else {
  const output = path.resolve(flag("out") ?? `out/${spec.id}.mp4`);
  const range = flag("frames")?.split("-").map(Number);
  let lastPct = -10;
  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    crf: 20,
    outputLocation: output,
    inputProps,
    browserExecutable,
    frameRange: range ? [range[0], range[1]] : undefined,
    onProgress: ({ progress }) => {
      const pct = Math.floor(progress * 100);
      if (pct >= lastPct + 10) {
        lastPct = pct;
        console.log(`[render] ${pct}%`);
      }
    },
  });
  console.log(`Video → ${output}`);
}
