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
  const a = first.charAt(0);
  const b = stripHonorific(surname).charAt(0);
  return (a + b).toUpperCase() || "?";
}

/**
 * Faculty photo with a branded initials fallback when the image is missing.
 * The fallback is a full-bleed panel rather than a circle so it still reads as
 * a portrait slot inside the card's rectangular photo area.
 */
export function FacultyAvatar({
  image,
  name,
  lastName,
  className,
}: {
  image?: string;
  name: string;
  lastName?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950",
          className,
        )}
      >
        <span className="font-display text-4xl font-semibold tracking-tight text-gold-300">
          {initialsOf(name, lastName)}
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
      className={cn("object-cover", className)}
    />
  );
}