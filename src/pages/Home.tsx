import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Quote, BookOpen, Laptop, Microscope, Landmark, Users, Building2 } from "lucide-react";
import {
  DEPARTMENTS,
  FACILITIES,
  GRADUATION_PROGRAMS,
  INTERMEDIATE_GROUPS,
  MILESTONES,
  MISSION,
  PRINCIPAL,
  SITE,
  STATS,
} from "@/data/site";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, DarkBand } from "@/components/ui/Section";
import { CallToAction } from "@/components/layout/CallToAction";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % SITE.media.hero.length) + SITE.media.hero.length) % SITE.media.hero.length);
  }, []);

  // Auto-advance, paused while the tab is hidden.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      if (!document.hidden) setIndex((i) => (i + 1) % SITE.media.hero.length);
    };
    timer.current = window.setInterval(tick, 6000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  return (
    <section className="relative isolate -mt-[calc(var(--nav-h))] flex min-h-[88svh] items-end overflow-hidden bg-brand-950 pt-[var(--nav-h)] lg:min-h-[92svh]">
      {/* Slides */}
      {SITE.media.hero.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className={cn(
            "absolute inset-0 -z-30 transition-opacity ease-spring [transition-duration:1400ms]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Img src={src} alt="" className="h-full w-full" loading={i === 0 ? "eager" : "lazy"} />
        </div>
      ))}

      {/* Bottom stays dark for text contrast; the top stays light so the photo
          actually reads instead of turning into flat grey. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-dark opacity-45" />

      <div className="container-page relative w-full pb-10 pt-16 sm:pb-16 sm:pt-24 lg:pb-24 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Kept short on phones so it never wraps to a stranded second line. */}
          <p className="eyebrow eyebrow-light mb-4 before:bg-gold-300 sm:mb-6">
            <span className="sm:hidden">Est. {SITE.established}</span>
            <span className="hidden sm:inline">
              Government of the Punjab · Est. {SITE.established}
            </span>
          </p>

          <h1 className="text-display-lg font-semibold text-white text-balance">
            A century of teaching, in the heart of Gujranwala.
          </h1>

          {/* Phones get a trimmed line so both hero buttons stay above the fold. */}
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-brand-100/80 sm:mt-7 sm:text-lg">
            <span className="sm:hidden">
              Educating generations since {SITE.established} — Intermediate groups and the four-year
              BS degree.
            </span>
            <span className="hidden sm:inline">
              {SITE.name} has educated generations since {SITE.established} — today a full public
              institution offering Intermediate groups and the four-year BS degree across the Faculty
              of Science and the Faculty of Arts.
            </span>
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10">
            <Link to="/admissions" className="btn-gold btn-sm sm:px-6 sm:py-3 sm:text-sm">
              Admissions 2026
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="btn-ghost-light btn-sm sm:px-6 sm:py-3 sm:text-sm">
              Our history
            </Link>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="mt-16 flex items-center gap-2.5">
          {SITE.media.hero.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="group py-2"
            >
              <span
                className={cn(
                  "block h-[3px] rounded-full transition-all duration-500 ease-spring",
                  i === index ? "w-12 bg-gold-400" : "w-6 bg-white/30 group-hover:bg-white/60",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stats band                                                          */
/* ------------------------------------------------------------------ */

function StatsBand() {
  return (
    <section className="border-b border-brand-900/10 bg-paper">
      <div className="container-page grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 70}>
            <div className="text-center lg:text-left">
              <p className="font-display text-3xl font-semibold text-brand-800 sm:text-4xl">
                {s.value}
                <span className="text-gold-500">{s.suffix}</span>
              </p>
              <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mission / heritage                                                  */
/* ------------------------------------------------------------------ */

function Mission() {
  return (
    <section className="section">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Our Mission"
            title="Education in service of a better Pakistan."
          />
          <Reveal delay={150}>
            <blockquote className="mt-8 border-l-2 border-gold-400 pl-6">
              <p className="font-display text-xl leading-snug text-ink text-pretty sm:text-2xl">
                “{MISSION}”
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 space-y-4 text-[15px] leading-relaxed text-ink-muted">
              <p>
                Founded in {SITE.established} as Guru Nanak Khalsa College, the institution has passed
                through three names and one nationalisation — and kept the same purpose throughout: to
                make higher learning available to students of Gujranwala regardless of what they could
                afford.
              </p>
              <p>
                The college now runs Intermediate groups alongside the four-year BS degree in the
                sciences and the arts, with postgraduate programmes in Chemistry, Zoology, Urdu,
                Political Science, Islamiat, English and Economics.
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <Link to="/about" className="btn-outline btn-sm mt-9">
              Read the full story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Principal */}
        <Reveal delay={100}>
          <figure className="card card-hover overflow-hidden">
            <div className="relative">
              <Img
                src={PRINCIPAL.photo}
                alt={PRINCIPAL.name}
                className="aspect-4/3 w-full"
                fallbackClassName="from-brand-800 via-brand-700 to-brand-950"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-lg font-semibold text-white">{PRINCIPAL.name}</p>
                <p className="text-[12px] uppercase tracking-[0.14em] text-gold-300">{PRINCIPAL.role}</p>
              </figcaption>
            </div>

            <div className="p-7">
              <Quote className="mb-4 h-6 w-6 text-gold-400" aria-hidden />
              <p className="font-display text-lg leading-snug text-ink text-pretty">
                “{PRINCIPAL.quote}”
              </p>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                {PRINCIPAL.body[0]}
              </p>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
              >
                Read the full message
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Heritage timeline                                                   */
/* ------------------------------------------------------------------ */

function Heritage() {
  return (
    <DarkBand className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Heritage"
          title="One hundred and nine years, in seven moments."
          lede="From a trust-funded building in 1917 to a four-year degree programme awarded under the Higher Education Department of the Punjab."
          tone="light"
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 60} as="li" className="bg-brand-950/85 p-7 backdrop-blur-sm">
              <p className="font-display text-2xl font-semibold text-gold-300">{m.year}</p>
              <h3 className="mt-3 font-display text-base font-semibold text-white">{m.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-brand-100/65">{m.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </DarkBand>
  );
}

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

const PROGRAM_ICON: Record<string, typeof BookOpen> = {
  science: Microscope,
  arts: BookOpen,
};

function Programs() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What We Offer"
            title="Intermediate groups and the four-year BS degree."
            lede="Study for two years of Intermediate, then continue into a 130-credit-hour BS programme run with the University of the Punjab."
          />
          <Reveal delay={150}>
            <Link to="/programs" className="btn-outline btn-sm">
              All programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Intermediate */}
        <Reveal delay={100}>
          <h3 className="mt-14 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            <span className="h-px w-8 bg-gold-400" />
            Intermediate · 2 years
          </h3>
        </Reveal>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INTERMEDIATE_GROUPS.map((g, i) => (
            <Reveal key={g.slug} delay={i * 70}>
              <Link
                to="/programs#intermediate"
                className="card card-hover group block h-full overflow-hidden"
              >
                <Img src={g.image} alt="" className="aspect-16/10 w-full" />
                <div className="p-6">
                  <h4 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-brand-700">
                    {g.name}
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{g.streams}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Graduation */}
        <Reveal delay={100}>
          <h3 className="mt-16 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            <span className="h-px w-8 bg-gold-400" />
            Graduation · 4 years · 130 credit hours
          </h3>
        </Reveal>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GRADUATION_PROGRAMS.map((p, i) => {
            const Icon = PROGRAM_ICON[p.faculty] ?? BookOpen;
            return (
              <Reveal key={p.slug} delay={i * 40}>
                <Link
                  to="/programs#graduation"
                  className="card card-hover group flex h-full items-center gap-4 p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-semibold text-ink transition-colors group-hover:text-brand-700">
                      {p.name}
                    </span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {p.faculty === "science" ? "Faculty of Science" : "Faculty of Arts"}
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Departments                                                         */
/* ------------------------------------------------------------------ */

function Departments() {
  const [filter, setFilter] = useState<"all" | "science" | "arts">("all");
  const list = DEPARTMENTS.filter((d) => filter === "all" || d.faculty === filter);

  const tabs = [
    { key: "all", label: "All departments" },
    { key: "science", label: "Faculty of Science" },
    { key: "arts", label: "Faculty of Arts" },
  ] as const;

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Departments"
          title="Seventeen departments across two faculties."
          lede="Each department is staffed by qualified instructors and carries its own teaching responsibilities for the Intermediate and BS programmes."
        />

        <Reveal delay={120}>
          <div className="mt-10 inline-flex flex-wrap gap-1.5 rounded-full border border-brand-900/10 bg-white p-1.5 shadow-card">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setFilter(t.key)}
                aria-pressed={filter === t.key}
                className={cn(
                  "rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300",
                  filter === t.key
                    ? "bg-brand-800 text-white shadow-card"
                    : "text-ink-soft hover:bg-brand-50 hover:text-brand-800",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <Reveal key={d.slug} delay={i * 45}>
              <article className="card card-hover group h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-ink">
                    {d.name}
                  </h3>
                  <span
                    className={cn(
                      "mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]",
                      d.faculty === "science"
                        ? "bg-brand-50 text-brand-700"
                        : "bg-gold-50 text-gold-700",
                    )}
                  >
                    {d.faculty === "science" ? "Science" : "Arts"}
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">{d.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Facilities                                                          */
/* ------------------------------------------------------------------ */

const FACILITY_ICON: Record<string, typeof BookOpen> = {
  Library: BookOpen,
  Monitor: Laptop,
  Microscope: Microscope,
  Landmark: Landmark,
  Users: Users,
  Building2: Building2,
};

function Facilities() {
  return (
    <DarkBand className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Campus"
          title="Facilities built for teaching, not display."
          tone="light"
          lede="A library, dedicated computer labs, science laboratories and an in-building museum — plus purpose-built blocks added as programmes grew."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f, i) => {
            const Icon = FACILITY_ICON[f.icon] ?? Building2;
            return (
              <Reveal key={f.title} delay={i * 60}>
                <article className="card-dark group h-full p-7 transition-colors duration-300 hover:border-gold-300/30 hover:bg-white/[0.07]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-brand-950">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-brand-100/65">{f.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </DarkBand>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Mission />
      <Heritage />
      <Programs />
      <Departments />
      <Facilities />
      <CallToAction />
    </>
  );
}