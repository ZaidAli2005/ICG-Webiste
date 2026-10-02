import { useState } from "react";
import { cn } from "@/lib/utils";

function initialsOf(name: string, lastName?: string) {
  const first = name.trim().split(/\s+/)[0] ?? "";
  const last = (lastName ?? "").trim().split(/\s+/)[0] ?? "";
  return (first.charAt(0) + last.charAt(0)).toUpperCase() || "?";
}

/** Faculty photo with a branded initials fallback when the image is missing. */
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
          "flex items-center justify-center rounded-full bg-gradient-to-br from-brand-800 to-brand-950 font-display text-white",
          className,
        )}
      >
        <span className="text-gold-300">{initialsOf(name, lastName)}</span>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={`${name} ${lastName ?? ""}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("rounded-full object-cover", className)}
    />
  );
}