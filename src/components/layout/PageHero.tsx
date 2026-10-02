import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  image?: string;
  breadcrumb: string;
  children?: ReactNode;
};

/** Shared hero for every inner page. */
export function PageHero({ eyebrow, title, lede, image, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      {image ? (
        <>
          <Img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full" loading="eager" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-brand-950/80" />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-dark" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid-faint bg-[size:56px_56px]" />
        </>
      )}

      <div className="container-page relative py-20 sm:py-24 lg:py-28">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex items-center gap-1.5 text-[12.5px] text-brand-100/60">
            <li>
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <li className="font-medium text-brand-100">{breadcrumb}</li>
          </ol>
        </nav>

        <p className="eyebrow eyebrow-light mb-5 before:bg-gold-300">{eyebrow}</p>
        <h1 className="max-w-4xl text-display-md font-semibold text-white text-balance">{title}</h1>

        {lede && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-100/75 sm:text-lg">
            {lede}
          </p>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

/** Small stat pill used on page heroes and in the homepage band. */
export function HeroStat({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <div className={cn("", className)}>
      <p className="font-display text-2xl font-semibold text-gold-300">{value}</p>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-100/60">
        {label}
      </p>
    </div>
  );
}