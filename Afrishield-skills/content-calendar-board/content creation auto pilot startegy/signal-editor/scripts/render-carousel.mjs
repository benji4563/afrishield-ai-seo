// CAROUSEL → PNG slides (Instagram) or PNG + PDF document (LinkedIn)
// node scripts/render-carousel.mjs <slides.json> --out <dir> [--theme instagram|linkedin] [--pdf]
// slides.json: { "theme": "instagram", "handle": "@enyongnjock723", "slides": [ { "variant": "cover", "headline": "…" }, … ] }
import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { browserExecutable } from "./lib/browser.mjs";

const args = process.argv.slice(2);
const flag = (k) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] ?? true : undefined;
};
const file = args[0];
if (!file || !flag("out")) {
  console.error("Usage: node scripts/render-carousel.mjs <slides.json> --out <dir> [--theme instagram|linkedin] [--pdf]");
  process.exit(1);
}
const deck = JSON.parse(fs.readFileSync(file, "utf8"));
const theme = flag("theme") ?? deck.theme ?? "instagram";
const outDir = path.resolve(flag("out"));
fs.mkdirSync(outDir, { recursive: true });
const wantPdf = Boolean(flag("pdf")) || theme === "linkedin";

console.log("[bundle] building…");
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const total = deck.slides.length;
const jpegs = [];
for (const [i, slide] of deck.slides.entries()) {
  const inputProps = { ...slide, theme, index: i + 1, total, handle: slide.handle ?? deck.handle };
  const composition = await selectComposition({ serveUrl, id: "CarouselSlide", inputProps, browserExecutable });
  const base = path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}`);
  await renderStill({ composition, serveUrl, output: `${base}.png`, inputProps, imageFormat: "png", browserExecutable });
  if (wantPdf) {
    await renderStill({ composition, serveUrl, output: `${base}.jpg`, inputProps, imageFormat: "jpeg", jpegQuality: 92, browserExecutable });
    jpegs.push(`${base}.jpg`);
  }
  console.log(`slide ${i + 1}/${total} → ${base}.png`);
}
if (wantPdf) {
  const pdfPath = path.join(outDir, `${path.basename(outDir)}.pdf`);
  writeJpegPdf(jpegs, pdfPath);
  for (const j of jpegs) fs.unlinkSync(j);
  console.log(`PDF → ${pdfPath}`);
}

// Minimal PDF writer: one full-bleed JPEG per page (DCTDecode), no dependencies.
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error("Not a baseline/progressive JPEG");
}

function writeJpegPdf(files, out) {
  const chunks = [];
  const offsets = [];
  let length = 0;
  const push = (b) => {
    const buf = Buffer.isBuffer(b) ? b : Buffer.from(b, "binary");
    chunks.push(buf);
    length += buf.length;
  };
  const obj = (n, body) => {
    offsets[n] = length;
    push(`${n} 0 obj\n`);
    for (const part of [].concat(body)) push(part);
    push("\nendobj\n");
  };
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  const pageIds = files.map((_, k) => 3 + k * 3);
  obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  obj(2, `<< /Type /Pages /Kids [${pageIds.map((p) => `${p} 0 R`).join(" ")}] /Count ${files.length} >>`);
  files.forEach((f, k) => {
    const img = fs.readFileSync(f);
    const { width, height } = jpegSize(img);
    const pageId = 3 + k * 3;
    const contentId = pageId + 1;
    const imageId = pageId + 2;
    // 72 dpi mapping: 1080×1350 px → 810×1012.5 pt page
    const W = (width * 0.75).toFixed(2);
    const H = (height * 0.75).toFixed(2);
    obj(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im${k} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    const content = `q ${W} 0 0 ${H} 0 0 cm /Im${k} Do Q`;
    obj(contentId, [`<< /Length ${content.length} >>\nstream\n`, content, "\nendstream"]);
    obj(imageId, [`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.length} >>\nstream\n`, img, "\nendstream"]);
  });
  const count = 3 + files.length * 3;
  const xref = length;
  push(`xref\n0 ${count}\n0000000000 65535 f \n`);
  for (let n = 1; n < count; n++) push(`${String(offsets[n]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  fs.writeFileSync(out, Buffer.concat(chunks));
}
