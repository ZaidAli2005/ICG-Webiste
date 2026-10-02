import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { ImgMark } from "@/components/ui/Img";

export function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 16);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the drawer on navigation. Adjusting state during render is React's
  // documented alternative to a setState-in-effect here.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The home hero pulls up under the navbar, so a transparent bar there needs
  // light text. Every other page starts below the navbar, so ink is correct.
  const overHero = !scrolled && pathname === "/";

  return (
    <>
      {/* Announcement strip */}
      <div className="relative z-[51] hidden bg-brand-950 text-brand-100/90 md:block">
        <div className="container-page flex h-9 items-center justify-between text-[12.5px]">
          <p className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
            </span>
            Admissions open for the new session — apply on merit, strictly on merit.
          </p>
          <a
            href={SITE.phones[0].href}
            className="link-underline flex items-center gap-1.5 transition-colors hover:text-gold-300"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE.phones[0].number}
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 ease-spring",
          scrolled
            ? "border-b border-brand-900/10 bg-paper/85 shadow-[0_1px_24px_-12px_rgba(12,21,18,.3)] backdrop-blur-xl"
            : overHero
              // Scrim keeps the logo and links legible over a bright photo.
              ? "bg-gradient-to-b from-brand-950/80 via-brand-950/45 to-transparent"
              : "bg-transparent",
        )}
      >
        <nav className="container-page flex h-[var(--nav-h)] items-center justify-between gap-5">
          {/* Brand */}
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <span
              className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ease-spring",
                overHero
                  ? "bg-white/10 ring-1 ring-white/20 group-hover:bg-white/15"
                  : "bg-brand-50 ring-1 ring-brand-900/8 group-hover:bg-brand-100",
              )}
            >
              <ImgMark
                src={SITE.media.logoMark}
                alt={`${SITE.shortName} emblem`}
                className={cn(
                  "h-9 w-9 transition-transform duration-300 ease-spring group-hover:scale-110",
                  overHero && "drop-shadow-[0_2px_8px_rgba(0,0,0,.4)]",
                )}
              />
            </span>

            <span className="hidden leading-tight xl:block">
              <span
                className={cn(
                  "block font-display text-[14px] font-bold tracking-tight transition-colors",
                  overHero ? "text-white" : "text-ink",
                )}
              >
                {SITE.name}
              </span>
              <span
                className={cn(
                  "mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
                  overHero ? "text-gold-300" : "text-brand-700",
                )}
              >
                Gujranwala · {SITE.tagline}
              </span>
            </span>
          </Link>

          {/* Primary nav — eight links need the extra room, so this is xl-only and
              everything below that gets the drawer instead. */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative block whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-200",
                      overHero
                        ? isActive
                          ? "bg-white/15 text-white"
                          : "text-brand-100/85 hover:bg-white/10 hover:text-white"
                        : isActive
                          ? "bg-brand-50 text-brand-800"
                          : "text-ink-soft hover:bg-brand-900/[.05] hover:text-brand-800",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-400"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/admissions"
              className={cn(
                "group relative hidden overflow-hidden whitespace-nowrap rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-card transition-all duration-300 ease-spring hover:shadow-lift active:scale-[.98] sm:inline-flex",
                overHero ? "bg-gold-400 text-brand-950" : "bg-brand-700 text-white",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-gold-300 transition-transform duration-300 ease-spring group-hover:translate-y-0"
              />
              <span className="relative flex items-center gap-1.5">
                Apply Now
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors xl:hidden",
                overHero
                  ? "border-white/30 text-white hover:bg-white/15"
                  : "border-ink/12 text-ink hover:bg-ink/5",
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-sm xl:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="container-page flex h-full flex-col gap-1 overflow-y-auto bg-paper pb-10 pt-6 shadow-lift"
            >
              <div className="mb-4 mt-2 flex items-center gap-3">
                <ImgMark src={SITE.media.logoMark} alt="" className="h-9 w-9" />
                <p className="eyebrow">Menu</p>
              </div>

              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between border-b border-brand-900/10 py-4 font-display text-xl font-semibold transition-colors",
                      isActive ? "text-brand-700" : "text-ink hover:text-brand-700",
                    )
                  }
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </NavLink>
              ))}

              <div className="mt-7 space-y-3">
                <Link to="/admissions" className="btn-primary w-full">
                  Apply for Admission
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href={SITE.phones[0].href} className="btn-outline w-full">
                  <Phone className="h-4 w-4" />
                  {SITE.phones[0].number}
                </a>
              </div>

              <div className="mt-auto flex items-center gap-2 pt-10 text-[11.5px] text-ink-muted">
                <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                Est. {SITE.established} · Government of the Punjab
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}