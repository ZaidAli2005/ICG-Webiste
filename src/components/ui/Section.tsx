import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  /** `light` is for dark backgrounds. */
  tone?: "default" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow mb-4",
              light && "eyebrow-light before:bg-gold-300",
              align === "center" && "justify-center",
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}

      {/* Headings wipe open from the top rather than sliding. A display face at
          this size reads as deliberate when it is uncovered, and as a heavy
          block being pushed past when it is translated. */}
      <Reveal delay={60} variant="clip">
        <h2
          className={cn(
            "text-display-sm font-semibold text-balance",
            light ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={120}>
          <p
            className={cn(
              "lede mt-5 text-pretty",
              light ? "text-brand-100/80" : "",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Full-bleed dark band used for hero-adjacent and closing sections. */
export function DarkBand({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative isolate overflow-hidden bg-brand-950", className)}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-dark" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-faint bg-[size:56px_56px]" />
      <div aria-hidden className="texture-noise absolute inset-0 -z-10" />
      {children}
    </section>
  );
}