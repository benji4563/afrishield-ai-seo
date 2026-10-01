// Chrome Headless Shell for rendering. Remotion's own download extracts into
// node_modules/.remotion, which in this deep folder exceeds Windows' 260-char path
// limit. Reuse a complete, shorter-path install instead. Override with
// REMOTION_BROWSER_EXECUTABLE.
import fs from "node:fs";
import path from "node:path";

const candidates = [
  process.env.REMOTION_BROWSER_EXECUTABLE,
  path.resolve("..", "..", "whitehouse-visuals", "node_modules", ".remotion", "chrome-headless-shell", "win64", "chrome-headless-shell-win64", "chrome-headless-shell.exe"),
].filter(Boolean);

export const browserExecutable = candidates.find((p) => fs.existsSync(p)) ?? null;
if (!browserExecutable) console.warn("[browser] no local Chrome Headless Shell found — Remotion will try to download one (may fail on long Windows paths).");
