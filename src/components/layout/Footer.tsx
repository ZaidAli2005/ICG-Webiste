import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  ArrowUpRight,
  LogIn,
  FileText,
  GraduationCap,
  Navigation,
  ArrowUp,
} from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { ImgMark } from "@/components/ui/Img";

/** Read once at module load — the footer year never changes mid-session. */
const YEAR = new Date().getFullYear();

const MAPS_SEARCH =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.address.mapsQuery,
  )}`;

/** Column heading. */
function ColHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">
      {children}
    </h3>
  );
}

/** Internal link with a hover slide. */
function FootLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 text-sm text-brand-100/75 transition-colors hover:text-white"
    >
      <span className="h-px w-0 bg-gold-400 transition-all duration-300 ease-spring group-hover:w-3" />
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-brand-100">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-dark" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
      />

      {/* ---------- Quick actions ---------- */}
      <section className="border-b border-white/10 bg-white/[0.03]">
        <div className="container-page py-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/admissions",
                internal: true,
                icon: GraduationCap,
                title: "Admissions",
                note: "Eligibility & criteria",
              },
              {
                href: `${SITE.phones[0].href}`,
                icon: FileText,
                title: "Prospectus",
                note: "Call the college office",
              },
              {
                href: SITE.portal.href,
                icon: LogIn,
                title: SITE.portal.label,
                note: "Staff & student sign in",
                highlight: true,
              },
              {
                href: MAPS_SEARCH,
                icon: Navigation,
                title: "Find the campus",
                note: "Open in Google Maps",
              },
            ].map((a) => {
              const Icon = a.icon;
              const inner = (
                <>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      a.highlight
                        ? "bg-gold-400/15 text-gold-300"
                        : "bg-white/[.06] text-brand-100/70"
                    } group-hover:bg-gold-400 group-hover:text-brand-950`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">{a.title}</span>
                    <span className="block text-[12px] text-brand-100/60">{a.note}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-100/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-300" />
                </>
              );

              const cls =
                "group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3.5 transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-gold-300/35 hover:bg-white/[.07]";

              return (
                <li key={a.title}>
                  {a.internal ? (
                    <Link to={a.href} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <a
                      href={a.href}
                      target={a.internal ? undefined : "_blank"}
                      rel="noreferrer"
                      className={cls}
                    >
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Main columns ---------- */}
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
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
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-100/70">
              {SITE.descriptor}
            </p>

            <div className="mt-6 flex gap-2">
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

          {/* Explore */}
          <div className="lg:col-span-2">
            <ColHeading>Explore</ColHeading>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <FootLink to={item.to}>{item.label}</FootLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <ColHeading>For students</ColHeading>
            <ul className="space-y-3">
              <li>
                <FootLink to="/admissions">Admission requirements</FootLink>
              </li>
              <li>
                <FootLink to="/programs#intermediate">Intermediate groups</FootLink>
              </li>
              <li>
                <FootLink to="/programs#graduation">BS programmes</FootLink>
              </li>
              <li>
                <FootLink to="/faculty">Faculty directory</FootLink>
              </li>
              <li>
                <FootLink to="/departments">Departments</FootLink>
              </li>
              <li>
                <FootLink to="/campus-life">Campus life</FootLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <ColHeading>Reach us</ColHeading>
            <ul className="space-y-3.5 text-sm text-brand-100/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <address className="not-italic">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </address>
              </li>
              {SITE.phones.slice(0, 2).map((p) => (
                <li key={p.number} className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <span>
                    <span className="block text-[10.5px] uppercase tracking-wide text-brand-100/45">
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
        </div>

        {/* ---------- Portal CTA ---------- */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-gold-300/25 bg-gradient-to-br from-brand-800/60 via-brand-900/40 to-transparent">
          <div className="flex flex-col items-start gap-6 p-7 sm:flex-row sm:items-center sm:justify-between lg:p-9">
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                <LogIn className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {SITE.portal.label}
                </h3>
                <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-brand-100/70">
                  {SITE.portal.description}
                </p>
              </div>
            </div>

            <a
              href={SITE.portal.href}
              target="_blank"
              rel="noreferrer"
              className="btn-gold btn-sm shrink-0"
            >
              Sign in
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-[12.5px] text-brand-100/55 sm:flex-row">
          <p>
            © {YEAR} {SITE.nameFull}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <p className="flex items-center gap-2">
              <span className="hidden sm:inline">Government of the Punjab</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-gold-400/60" />
              <span className="font-display">Est. 1917</span>
            </p>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 font-medium text-brand-100/70 transition-colors hover:border-gold-300/40 hover:text-gold-300"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
