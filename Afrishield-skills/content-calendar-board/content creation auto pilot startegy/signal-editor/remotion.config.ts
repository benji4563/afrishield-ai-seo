// Config applies to the CLI only (studio / render). Node scripts pass the same
// choices explicitly (see scripts/lib/browser.mjs).
import fs from "node:fs";
import path from "node:path";
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("src/index.ts");

// Remotion's own browser download exceeds Windows' path limit in this deep folder.
const sharedBrowser =
  process.env.REMOTION_BROWSER_EXECUTABLE ??
  path.resolve("..", "..", "whitehouse-visuals", "node_modules", ".remotion", "chrome-headless-shell", "win64", "chrome-headless-shell-win64", "chrome-headless-shell.exe");
if (fs.existsSync(sharedBrowser)) Config.setBrowserExecutable(sharedBrowser);
