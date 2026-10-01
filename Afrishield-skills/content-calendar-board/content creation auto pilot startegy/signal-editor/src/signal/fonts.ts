import { loadFont as loadSora } from "@remotion/google-fonts/Sora";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Sora + Inter are the afrishieldai.com fonts; JetBrains Mono carries data labels.
export const display = loadSora("normal", { weights: ["700", "800"], subsets: ["latin"] }).fontFamily;
export const body = loadInter("normal", { weights: ["500", "700"], subsets: ["latin"] }).fontFamily;
export const mono = loadMono("normal", { weights: ["500", "700"], subsets: ["latin"] }).fontFamily;
