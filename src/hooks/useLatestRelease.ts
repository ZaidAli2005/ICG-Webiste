import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The published GitHub Release is the single source of truth for the app
 * version. This hook reads `/releases/latest` from the public API, so a newly
 * published release appears on the site without any code change.
 *
 * The response is cached in `localStorage` to keep GitHub's rate limit (60
 * requests/hour per IP, shared by everyone behind one address) off the hot
 * path. The cache is a *short-lived* cache: the first paint uses it, then the
 * hook revalidates in the background. A stale cache is therefore never shown
 * for longer than one page load, which is what lets a new release through
 * without touching the site.
 */

export interface LatestRelease {
  /** `tag_name`, e.g. "v1.0.1". Falls back to the release title. */
  version: string;
  /** Release title as written on GitHub. */
  releaseName: string;
  /** Release body / notes, verbatim Markdown from GitHub. */
  releaseNotes: string;
  /** `browser_download_url` of the discovered `.apk` asset. */
  apkUrl: string;
  /** Asset filename, used for the browser's saved-file name. */
  apkFileName: string;
  /** Asset size in bytes, as reported by GitHub. */
  apkSize: number;
  /** `published_at` of the release. */
  publishedAt: string;
  /** Human-facing page for the release. */
  htmlUrl: string;
}

export interface LatestReleaseState {
  release: LatestRelease | null;
  loading: boolean;
  /** True while a cached value is shown and a fresh one is still in flight. */
  revalidating: boolean;
  error: string | null;
}

/** How long a cached release is reused before a fresh fetch is *required*. */
const CACHE_TTL_MS = 5 * 60 * 1000;
/** Cap on the cached payload so a large release body can't blow the quota. */
const MAX_CACHED_BODY = 8000;
const CACHE_KEY = "icg.latest-release.v1";

interface CacheEnvelope {
  release: LatestRelease;
  storedAt: number;
}

/** Only the fields the page renders — the API sends much more than we need. */
function pickApk<T extends { name: string; browser_download_url: string; size: number }>(
  assets: T[],
): T | undefined {
  return assets.find((asset) => asset.name.toLowerCase().endsWith(".apk"));
}

function isRelease(value: unknown): value is LatestRelease {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as LatestRelease).version === "string" &&
    typeof (value as LatestRelease).apkUrl === "string" &&
    typeof (value as LatestRelease).apkFileName === "string"
  );
}

function readCache(): CacheEnvelope | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEnvelope;
    if (!parsed || !isRelease(parsed.release)) return null;
    return parsed;
  } catch {
    // Private-mode / disabled storage, or corrupt JSON. Never fatal.
    return null;
  }
}

function writeCache(release: LatestRelease) {
  try {
    const trimmed: LatestRelease = {
      ...release,
      releaseNotes: release.releaseNotes.slice(0, MAX_CACHED_BODY),
    };
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ release: trimmed, storedAt: Date.now() } satisfies CacheEnvelope),
    );
  } catch {
    // Quota exceeded or storage blocked. The fetch still worked; just no cache.
  }
}

export function formatReleaseDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  // Month + year reads better next to a version number than a full date.
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/** 104_857_600 → "94 MB". GitHub reports raw bytes, so the site converts. */
export function formatBytes(bytes: number): string | null {
  if (!Number.isFinite(bytes) || bytes <= 0) return null;
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unit]}`;
}

export function useLatestRelease(repo: string): LatestReleaseState & { reload: () => void } {
  const [release, setRelease] = useState<LatestRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [revalidating, setRevalidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const load = useCallback(async () => {
    const id = ++requestId.current;
    const cached = readCache();
    const isFresh = cached ? Date.now() - cached.storedAt < CACHE_TTL_MS : false;

    // Paint the cached release immediately so a repeat visit is instant.
    if (cached && isFresh) {
      setRelease(cached.release);
      setLoading(false);
    } else if (cached) {
      // Stale but usable: show it while the network call is in flight.
      setRelease(cached.release);
      setRevalidating(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/releases/latest`,
        {
          headers: { Accept: "application/vnd.github+json" },
          // GitHub sets CORS on api.github.com, so this works from Pages.
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "No release has been published yet."
            : "Unable to check for the latest version. Please try again later.",
        );
      }

      const data = (await response.json()) as {
        tag_name?: string;
        name?: string | null;
        body?: string | null;
        published_at?: string;
        html_url?: string;
        assets?: { name: string; browser_download_url: string; size: number }[];
      };

      if (id !== requestId.current) return; // A newer request superseded this one.

      const version = data.tag_name?.trim() || data.name?.trim() || "";
      if (!version) {
        throw new Error("Unable to check for the latest version. Please try again later.");
      }

      const apk = pickApk(data.assets ?? []);
      if (!apk) {
        // The release exists but carries no APK. Report it distinctly, and
        // still surface the version so the page isn't just blank.
        setRelease({
          version,
          releaseName: data.name?.trim() || version,
          releaseNotes: data.body?.trim() ?? "",
          apkUrl: "",
          apkFileName: "",
          apkSize: 0,
          publishedAt: data.published_at ?? "",
          htmlUrl: data.html_url ?? "",
        });
        setError("No APK is currently available for this release.");
        setLoading(false);
        setRevalidating(false);
        return;
      }

      const next: LatestRelease = {
        version,
        releaseName: data.name?.trim() || version,
        releaseNotes: data.body?.trim() ?? "",
        apkUrl: apk.browser_download_url,
        apkFileName: apk.name,
        apkSize: apk.size,
        publishedAt: data.published_at ?? "",
        htmlUrl: data.html_url ?? "",
      };

      writeCache(next);
      setRelease(next);
      setError(null);
      setLoading(false);
      setRevalidating(false);
    } catch (err) {
      if (id !== requestId.current) return;
      // Keep showing whatever the cache gave us; the fallback button in the
      // page covers the case where there is nothing cached either.
      setError(
        cached
          ? null
          : err instanceof Error
            ? err.message
            : "Unable to check for the latest version. Please try again later.",
      );
      setLoading(false);
      setRevalidating(false);
    }
  }, [repo]);

  useEffect(() => {
    void load();
  }, [load]);

  return { release, loading, revalidating, error, reload: () => void load() };
}