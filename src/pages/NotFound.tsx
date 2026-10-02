import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { NAV } from "@/data/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-brand-950">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-dark" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-faint bg-[size:56px_56px]" />

      <div className="container-page py-24 text-center">
        <p className="font-display text-[7rem] font-semibold leading-none text-gold-400/25 sm:text-[11rem]">
          404
        </p>

        <h1 className="mt-4 text-display-sm font-semibold text-white text-balance">
          This page isn't on campus.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-brand-100/70">
          The link may be out of date, or the page may have moved. Try one of the sections below.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-gold btn-sm">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <nav aria-label="Suggested pages" className="mt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-100/40">
            Suggested pages
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
            {NAV.filter((n) => n.to !== "/").map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="link-underline text-[13.5px] font-medium text-brand-100/70 transition-colors hover:text-white"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}