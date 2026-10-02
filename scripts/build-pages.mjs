import { spawnSync, execSync } from "node:child_process";

/**
 * Builds for GitHub Pages.
 *
 * The site is served from https://<user>.github.io/<repo>/ rather than the
 * domain root, so Vite needs BASE_PATH and React Router needs a matching
 * basename. vite.config.ts reads BASE_PATH; App.tsx reads import.meta.env.BASE_URL.
 *
 * The repo name is read from the git remote so renaming the repository on
 * GitHub never requires editing this file.
 */
function detectRepo() {
  if (process.env.PAGES_REPO) return process.env.PAGES_REPO;

  try {
    const remote = execSync("git remote get-url origin", { encoding: "utf8" }).trim();
    const match = remote.match(/github\.com[:/]+[^/]+\/([^/.]+)(?:\.git)?$/);
    if (match) return match[1];
  } catch {
    /* no remote configured — fall through to the default */
  }

  console.warn("[pages] could not read the repo from `git remote`; using ICG-Website.");
  return "ICG-Website";
}

const repo = detectRepo();
const basePath = `/${repo}/`;

console.log(`[pages] repo: ${repo}`);
console.log(`[pages] building with BASE_PATH=${basePath}`);

const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  env: { ...process.env, BASE_PATH: basePath },
  shell: process.platform === "win32",
});

if (result.status !== 0) process.exit(result.status ?? 1);

// Fail loudly if the assets did not pick up the subpath — this is the silent
// failure where the site looks fine but every CSS/JS/image request 404s.
const html = execSync("cat dist/index.html", { encoding: "utf8" });
if (!html.includes(basePath)) {
  console.error(`[pages] dist/index.html does not reference ${basePath} — assets will 404.`);
  process.exit(1);
}

console.log(`[pages] ok — assets correctly point at ${basePath}`);