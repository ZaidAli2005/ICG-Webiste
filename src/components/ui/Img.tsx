import { useState } from "react";
import { cn } from "@/lib/utils";

type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Rendered while the image loads or if it fails. */
  fallbackClassName?: string;
  loading?: "lazy" | "eager";
  /** Larger sources look soft when downscaled for a 64px logo. */
  sizes?: string;
};

/**
 * An image that degrades to a branded gradient panel when the file is missing
 * or 404s, so the layout never collapses into a broken-icon box.
 */
export function Img({
  src,
  alt,
  className,
  imgClassName,
  fallbackClassName,
  loading = "lazy",
}: ImgProps) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  return (
    <div className={cn("relative overflow-hidden bg-brand-900/5", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-700 to-brand-950",
          state === "ready" && "opacity-0",
          "transition-opacity duration-500",
          fallbackClassName,
        )}
      />
      {state !== "error" && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          className={cn(
            "relative h-full w-full object-cover transition-opacity duration-500",
            state === "ready" ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}

/** Circular variant, used for the logo in the navbar and footer. */
export function ImgMark({ src, alt, className }: Omit<ImgProps, "imgClassName">) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-950 font-display text-lg font-bold text-gold-300",
          className,
        )}
        aria-hidden
      >
        GI
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-contain", className)}
      onError={() => setFailed(true)}
    />
  );
}