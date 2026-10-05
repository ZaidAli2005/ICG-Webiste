import { useState } from "react";
import { cn } from "@/lib/utils";

const HONORIFIC = /^(mr|mrs|ms|miss|dr|prof|shaikh|syed|maulana)\.?\s+/i;

function stripHonorific(word: string) {
  return word.replace(HONORIFIC, "");
}

/**
 * "Muhammad Akbar Azeem" -> "MA". Honors are dropped so a title never becomes
 * the initial, and the surname falls back to the last word when the record has
 * no separate lastName field.
 */
function initialsOf(name: string, lastName?: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const explicit = (lastName ?? "").trim().split(/\s+/)[0] ?? "";
  const first = stripHonorific(parts[0] ?? "");
  const surname = explicit || parts[parts.length - 1] || "";
  return ((first.charAt(0) + stripHonorific(surname).charAt(0)) || "?").toUpperCase();
}

/**
 * Faculty photo, with a branded initials fallback whenever the image is
 * missing or fails to load.
 *
 * `shape="circle"` centres the portrait in a round badge for cards;
 * `shape="portrait"` fills a rectangular panel, which suits a photo that
 * carries the name over it.
 */
export function FacultyAvatar({
  image,
  name,
  lastName,
  className,
  shape = "circle",
  initialsClassName,
}: {
  image?: string;
  name: string;
  lastName?: string;
  className?: string;
  shape?: "circle" | "portrait";
  initialsClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = initialsOf(name, lastName);

  if (!image || failed) {
    return (
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950",
          shape === "circle" ? "rounded-full" : "absolute inset-0",
          className,
        )}
      >
        <span
          className={cn(
            "font-display font-semibold tracking-tight text-gold-300",
            shape === "circle" ? "text-2xl" : "text-4xl",
            initialsClassName,
          )}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={`${name}${lastName ? ` ${lastName}` : ""}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        "shrink-0 object-cover",
        shape === "circle" && "rounded-full",
        className,
      )}
    />
  );
}