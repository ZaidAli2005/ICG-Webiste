import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "left" | "right" | "scale" | "clip";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "blockquote";
  /**
   * How the content arrives. `up` is the safe default; `clip` wipes the block
   * open from the top, which suits headings but needs an inner element —
   * see the note on `clip` below.
   */
  variant?: RevealVariant;
};

const HIDDEN: Record<RevealVariant, string> = {
  up: "translate-y-6 opacity-0",
  left: "translate-x-6 opacity-0",
  right: "-translate-x-6 opacity-0",
  scale: "scale-[0.97] opacity-0",
  clip: "opacity-0",
};

const SHOWN: Record<RevealVariant, string> = {
  up: "translate-y-0 opacity-100",
  left: "translate-x-0 opacity-100",
  right: "-translate-x-0 opacity-100",
  scale: "scale-100 opacity-100",
  clip: "opacity-100",
};

/* Clip insets, kept apart because only these two animate.
   The resting bottom inset is negative so descenders on the last line are not
   shaved off once the wipe has finished. */
const CLIP_HIDDEN = "[clip-path:inset(0_0_100%_0)]";
const CLIP_SHOWN = "[clip-path:inset(0_0_-25%_0)]";

const TRANSITION =
  "transition-[opacity,transform,clip-path] duration-[650ms] ease-spring";

/**
 * Fades content in the first time it scrolls into view. Once shown it stays
 * shown — re-hiding on scroll-up reads as a glitch rather than polish.
 *
 * The delay is a transition-delay rather than a setTimeout, so a staggered
 * group starts as one gesture and cannot drift apart if a frame is dropped.
 *
 * `clip` needs a wrapper the observer does not see. A fully closed clip-path
 * clips the element's own hit area to nothing, and IntersectionObserver
 * measures that area — so a clipped element reports a ratio of 0 forever and
 * never triggers its own reveal. The outer element keeps the full box and is
 * what we observe; the inner one carries the wipe.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  // Without IntersectionObserver we cannot observe anything, so start visible
  // rather than leaving the page blank.
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";
  const delayStyle = shown ? { transitionDelay: `${delay}ms` } : undefined;

  if (variant === "clip") {
    return (
      <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        <div
          style={delayStyle}
          className={cn(TRANSITION, shown ? CLIP_SHOWN : CLIP_HIDDEN)}
        >
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      style={delayStyle}
      className={cn(TRANSITION, shown ? SHOWN[variant] : HIDDEN[variant], className)}
    >
      {children}
    </Tag>
  );
}
