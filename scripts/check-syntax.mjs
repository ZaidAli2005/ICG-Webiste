import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Tailwind v3 silently ignores v4-only utility syntax — `aspect-4/5` compiles
 * to nothing rather than erroring, so the class reaches the DOM and the panel
 * collapses to zero height with no build warning. That already cost one
 * silent regression across seven call sites; this fails loudly instead.
 */

const SRC = new URL("../src/", import.meta.url).pathname;
const BARE = /\baspect-(\d+(?:\/\d+)+)\b/g;

/** @param {string} dir */
function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.tsx?$/.test(entry) ? [full] : [];
  });
}

const offenders = [];

for (const file of walk(SRC)) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(BARE)) {
    if (m.index === undefined) continue;
    const line = src.slice(0, m.index).split("\n").length;
    offenders.push(`${file.replace(SRC, "src/")}:${line}  aspect-${m[1]}`);
  }
}

if (offenders.length) {
  console.error("Tailwind v4 syntax found in v3 project — these compile to nothing:");
  for (const o of offenders) console.error("  " + o);
  console.error("\nUse the arbitrary-value form instead: aspect-[4/5]");
  process.exit(1);
}

console.log("[check:tailwind-syntax] no v4-only aspect syntax found");