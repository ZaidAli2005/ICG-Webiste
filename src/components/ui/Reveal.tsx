import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Fades content up the first time it scrolls into view. Once shown it stays
 * shown — re-hiding on scroll-up reads as a glitch rather than polish.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  // Without IntersectionObserver (or during SSR) we cannot observe anything,
  // so start visible rather than leaving the page blank.
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

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      style={shown ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-spring",
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}