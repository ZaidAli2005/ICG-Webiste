import { copyFile, access } from "node:fs/promises";
import { constants } from "node:fs";

/**
 * GitHub Pages has no rewrite rules — when a path doesn't match a real file it
 * serves /404.html. Copying the built index.html there makes the SPA load on a
 * hard refresh or a shared deep link such as /about.
 *
 * Harmless on Render/Netlify, where a real rewrite rule already handles it.
 */
const from = new URL("../dist/index.html", import.meta.url);
const to = new URL("../dist/404.html", import.meta.url);

try {
  await access(from, constants.R_OK);
} catch {
  console.error("[postbuild] dist/index.html missing — did the build run?");
  process.exit(1);
}

await copyFile(from, to);
console.log("[postbuild] dist/404.html written (SPA deep-link fallback)");