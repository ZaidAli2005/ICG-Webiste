import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { ImgMark } from "@/components/ui/Img";

/** Read once at module load — the footer year never changes mid-session. */
const YEAR = new Date().getFullYear();

export function Footer() {

  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-brand-100">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-dark" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <ImgMark src={SITE.media.logoMark} alt="College emblem" className="h-14 w-14" />
              <div className="leading-tight">
                <p className="font-display text-lg font-bold text-white">{SITE.name}</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
                  Gujranwala · {SITE.tagline}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-100/70">{SITE.descriptor}</p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-brand-100/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
              Reach us
            </h3>
            <ul className="space-y-3.5 text-sm text-brand-100/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </span>
              </li>
              {SITE.phones.slice(0, 2).map((p) => (
                <li key={p.number} className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <span>
                    <span className="block text-[11px] uppercase tracking-wide text-brand-100/45">
                      {p.label}
                    </span>
                    <a href={p.href} className="transition-colors hover:text-white">
                      {p.number}
                    </a>
                  </span>
                </li>
              ))}
              {SITE.emails.map((e) => (
                <li key={e.address} className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <a
                    href={`mailto:${e.address}`}
                    className="break-all transition-colors hover:text-white"
                  >
                    {e.address}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map + social */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
              Find us
            </h3>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.mapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-4/3 overflow-hidden rounded-xl border border-white/12 bg-brand-900"
            >
              {/* Decorative map grid — the embedded iframe is opt-in via env */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[size:28px_28px] opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)",
                }}
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <MapPin className="h-7 w-7 text-gold-300" />
                <span className="px-6 text-[11px] uppercase tracking-[0.14em] text-brand-100/70">
                  Islamia College Road
                </span>
              </span>
              <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm transition-colors group-hover:bg-white/20">
                Open map
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </a>

            <div className="mt-4 flex gap-2">
              {SITE.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-brand-100/80 transition-all hover:-translate-y-0.5 hover:border-gold-300/50 hover:text-gold-300"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rule-gold my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-[12.5px] text-brand-100/55 sm:flex-row">
          <p>
            © {YEAR} {SITE.nameFull}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="hidden sm:inline">Built for the college community</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-gold-400/60" />
            <span className="font-display">Est. 1917</span>
          </p>
        </div>
      </div>
    </footer>
  );
}