import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Quote,
  BookOpen,
  Laptop,
  Microscope,
  Landmark,
  Users,
  Building2,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  DEPARTMENTS,
  FACILITIES,
  FACULTIES,
  GRADUATION_PROGRAMS,
  INTERMEDIATE_GROUPS,
  MILESTONES,
  MISSION,
  PRINCIPAL,
  SITE,
  STATS,
  VISION,
} from "@/data/site";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, DarkBand } from "@/components/ui/Section";
import { CallToAction } from "@/components/layout/CallToAction";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

/** How long each hero slide is held before the carousel advances. */
const SLIDE_MS = 6000;

/** The shared entrance curve, matching the CSS `ease-spring` token. */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero copy arrives from below with a slight blur. The blur is what sells it:
 * a block that only translates still looks like a block sliding past, while
 * defocus reads as the text coming into focus.
 */
const HERO_ITEM = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

/** Credential icons rotate in a quarter turn as they arrive. */
const HERO_ICON = {
  hidden: { opacity: 0, scale: 0.6, rotate: -25 },
  shown: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                */
/* ------------------------------------------------------------------ */

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * A year like "1917" is shown as-is — counting up to it reads as noise rather
 * than emphasis. Reduced-motion and a missing IntersectionObserver both render
 * the final value immediately, so nothing is ever left stranded on zero.
 */
function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const target = Number(value.replace(/[^\d]/g, "")) || 0;
  /** Four digits means it is a year, not a quantity. */
  const isYear = String(target).length === 4;

  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (isYear) return;

    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        // Reset only now that it is on screen. Doing it on mount would show a
        // stray zero to anyone who never scrolls this far.
        setShown(0);

        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1200);
          setShown(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isYear, target]);

  return (
    <span ref={ref}>
      {shown.toLocaleString("en-US")}
      {suffix && <span className="text-gold-500">{suffix}</span>}
    </span>
  );
}

/** Small uppercase label that opens a section. */
function Label({ children, className }: { children: string; className?: string }) {
  return (
    <h3
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-gold-400" />
      {children}
    </h3>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

/**
 * One clock for the whole carousel.
 *
 * A `setInterval` advance plus a separately-timed CSS progress bar drift apart
 * by the time a visitor has read two slides — the bar fills, then the photo
 * changes a beat later. Driving both from a single rAF loop makes the fill
 * reaching 100% and the slide changing the same event, so they cannot disagree.
 *
 * Only the index lives in state. Progress is written straight to the fill
 * element's transform, because routing 60fps of it through React would
 * re-render the whole hero — slides, copy and controls included — every frame.
 */
function useCarouselClock(length: number) {
  const [index, setIndex] = useState(0);

  /* The active slide's fill, and the elapsed time behind it. Both are read
     inside the animation loop rather than captured, so the loop never needs
     restarting and never has a stale closure to disagree with. */
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const elapsedRef = useRef(0);

  const writeFill = useCallback(() => {
    const node = fillRef.current;
    if (node) node.style.transform = `scaleX(${elapsedRef.current / SLIDE_MS})`;
  }, []);

  const go = useCallback(
    (next: number) => {
      elapsedRef.current = 0;
      writeFill();
      setIndex(((next % length) + length) % length);
    },
    [length, writeFill],
  );

  useEffect(() => {
    if (length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // Clamp the delta so returning to a backgrounded tab advances one slide
      // rather than skipping to wherever the wall clock now is.
      const dt = Math.min(now - last, 100);
      last = now;

      if (!document.hidden) {
        elapsedRef.current += dt;

        if (elapsedRef.current >= SLIDE_MS) {
          elapsedRef.current = 0;
          setIndex((i) => (i + 1) % length);
        }

        writeFill();
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [length, writeFill]);

  return { index, go, fillRef };
}

function Hero() {
  const slides = SITE.media.hero;
  const total = slides.length;
  const { index, go, fillRef } = useCarouselClock(total);

  /* The photo lags the copy on scroll, which reads as depth. The 1.06 scale is
     the margin that pays for the drift — without it the top edge lifts into
     the gap as the offset grows. */
  const { ref: photoRef, y: photoY } = useParallax({ distance: 90 });

  /* Points of proof, straight from SITE/media data — no invented claims. */
  const credentials = [
    { icon: ShieldCheck, label: "Government of the Punjab" },
    { icon: GraduationCap, label: "BS (Four Year) with the University of the Punjab" },
    { icon: BookOpen, label: "Intermediate groups alongside the degree" },
  ];

  return (
    <section
      ref={photoRef}
      className="relative isolate -mt-[calc(var(--nav-h))] flex min-h-[92svh] items-end overflow-hidden bg-brand-950 pt-[var(--nav-h)] lg:min-h-[94svh]"
    >
      {/* Slides */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-30 scale-[1.06] will-change-transform"
        style={{ y: photoY }}
      >
        {slides.map((src, i) => (
          <div
            key={src}
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity ease-spring [transition-duration:1400ms]",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            {/* A slow drift keeps a still photograph from reading as a flat plate. */}
            <Img
              src={src}
              alt=""
              className="h-full w-full"
              imgClassName={cn(
                "motion-safe:scale-105 motion-safe:transition-transform motion-safe:duration-[9000ms] motion-safe:ease-linear",
                i === index ? "motion-safe:scale-100" : "motion-safe:scale-[1.02]",
              )}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </motion.div>

      {/* Scrim: left-weighted so the headline always clears the photograph, and
          deepening toward the bottom where the copy and controls sit. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/92 via-brand-950/70 to-brand-950/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-t from-brand-950 via-brand-950/75 to-brand-950/10"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-dark opacity-40" />
      <div aria-hidden className="texture-noise absolute inset-0 -z-10" />

      <div className="container-page relative w-full pb-28 pt-16 sm:pb-32 lg:pb-40">
        {/* Children are staggered off one parent transition rather than each
            carrying its own delay, so the entrance cannot drift if a frame is
            dropped. The parent sits at opacity 0 until mounted so nothing
            flashes before the animation starts. */}
        <motion.div
          initial="hidden"
          animate="shown"
          variants={{
            hidden: { opacity: 0 },
            shown: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
          className="max-w-3xl"
        >
          <motion.div
            variants={HERO_ITEM}
            className="[perspective:1200px]"
          >
            <p className="eyebrow eyebrow-light mb-4 before:bg-gold-300 sm:mb-6">
              <span className="sm:hidden">Est. {SITE.established}</span>
              <span className="hidden sm:inline">
                Government of the Punjab · Est. {SITE.established}
              </span>
            </p>
          </motion.div>

          {/* The headline wipes open rather than sliding — a large display face
              reads better arriving as a reveal than as a moving block. */}
          <motion.div variants={HERO_ITEM}>
            <h1 className="text-display-lg font-semibold text-white text-balance">
              A century of teaching, in the heart of Gujranwala.
            </h1>
          </motion.div>

          {/* Phones get a trimmed line so both hero buttons stay above the fold. */}
          <motion.div variants={HERO_ITEM}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-brand-100/80 sm:mt-7 sm:text-lg">
              <span className="sm:hidden">
                Educating generations since {SITE.established} — Intermediate groups and the
                four-year BS degree.
              </span>
              <span className="hidden sm:inline">
                {SITE.name} has educated generations since {SITE.established} — today a full public
                institution offering Intermediate groups and the four-year BS degree across the
                Faculty of Science and the Faculty of Arts.
              </span>
            </p>
          </motion.div>

          <motion.div variants={HERO_ITEM} className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <Link to="/admissions" className="btn-gold btn-sm sm:px-6 sm:py-3 sm:text-sm">
              Admissions 2026
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="btn-ghost-light btn-sm sm:px-6 sm:py-3 sm:text-sm">
              Our history
            </Link>
          </motion.div>

          {/* Credentials — hidden on phones, where the buttons need the room. */}
          <motion.ul
            variants={HERO_ITEM}
            className="mt-10 hidden flex-col gap-3 border-l border-white/15 pl-5 sm:flex lg:mt-12"
          >
            {credentials.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={HERO_ITEM}
                className="flex items-center gap-2.5 text-[13.5px] text-brand-100/75"
              >
                <motion.span
                  variants={HERO_ICON}
                  className="text-gold-300"
                  aria-hidden
                >
                  <Icon className="h-4 w-4 shrink-0" />
                </motion.span>
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Slide controls */}
        <div className="mt-12 flex items-center gap-5 sm:mt-14">
          <div className="flex items-center gap-2.5">
            {slides.map((src, i) => (
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
                    "relative block h-[3px] overflow-hidden rounded-full transition-all duration-500 ease-spring",
                    i === index ? "w-12 bg-gold-400/30" : "w-6 bg-white/30 group-hover:bg-white/60",
                  )}
                >
                  {/* Scaled by the carousel clock itself, not a CSS animation,
                      so the fill finishing and the slide changing are one
                      event. Written imperatively — see useCarouselClock. */}
                  {i === index && (
                    <span
                      ref={fillRef}
                      aria-hidden
                      className="absolute inset-0 origin-left rounded-full bg-gold-400 will-change-transform"
                      style={{ transform: "scaleX(0)" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <p className="font-display text-[13px] tabular-nums text-brand-100/50">
            <span className="text-gold-300">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-brand-100/25">/</span>
            {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared surfaces                                                     */
/* ------------------------------------------------------------------ */

/**
 * Hairline that draws itself out from the left when the block it heads is
 * revealed. The scale runs on its own transform so it does not fight the
 * reveal's translate for the same property.
 */
function DrawRule({ className, tone = "default" }: { className?: string; tone?: "default" | "light" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-px w-full origin-left motion-safe:animate-rule-in",
        tone === "light"
          ? "bg-gradient-to-r from-gold-400/70 via-white/15 to-transparent"
          : "bg-gradient-to-r from-gold-400/60 via-brand-900/15 to-transparent",
        className,
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Stats — pulled up to overlap the hero                               */
/* ------------------------------------------------------------------ */

function StatsBand() {
  return (
    <section className="relative z-10 -mt-20 sm:-mt-24">
      <div className="container-page">
        <div className="overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-lift">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 70}
                className={cn(
                  "px-6 py-8 text-center sm:px-8 sm:py-10 lg:text-left",
                  // Vertical rules on desktop, horizontal on the stacked grid.
                  i % 2 === 0 && "border-r border-brand-900/10 lg:border-r",
                  i < 2 && "border-b border-brand-900/10 lg:border-b-0",
                  i === 2 && "lg:border-r",
                )}
              >
                <dd className="font-display text-3xl font-semibold tracking-tight text-brand-800 sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {s.label}
                </dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mission / heritage                                                 */
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
            <DrawRule className="mt-12" />
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 rounded-2xl border border-brand-900/10 bg-brand-50/60 p-7">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                <Sparkles className="h-3.5 w-3.5 text-gold-500" aria-hidden />
                Our Vision
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft text-pretty">{VISION}</p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-ink-muted">
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

          <Reveal delay={360}>
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
                className="aspect-[4/3] w-full"
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
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">{PRINCIPAL.body[0]}</p>
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

        <Reveal delay={180}>
          <DrawRule tone="light" className="mt-14" />
        </Reveal>

        {/* Hairline grid: every cell must be filled, so the closing cell is a
            link onward rather than an empty square. */}
        <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 60} as="li" className="group bg-brand-950/85 p-7 backdrop-blur-sm">
              <p className="font-display text-2xl font-semibold text-gold-300">{m.year}</p>
              <h3 className="mt-3 font-display text-base font-semibold leading-snug text-white">
                {m.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-brand-100/65">{m.body}</p>
            </Reveal>
          ))}

          <Reveal as="li" delay={MILESTONES.length * 60} className="flex">
            <Link
              to="/about"
              className="group flex h-full w-full flex-col justify-between gap-6 bg-brand-950/85 p-7 transition-colors duration-300 hover:bg-brand-900/85"
            >
              <p className="eyebrow eyebrow-light before:bg-gold-300">Where we are today</p>
              <p className="font-display text-lg font-semibold leading-snug text-white text-pretty">
                Intermediate groups, a four-year BS degree and postgraduate teaching on one campus.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                Read the full history
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-spring group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </ol>
      </div>
    </DarkBand>
  );
}

/* ------------------------------------------------------------------ */
/* Programs                                                           */
/* ------------------------------------------------------------------ */

const PROGRAM_ICON: Record<string, LucideIcon> = {
  science: Microscope,
  arts: BookOpen,
};

function Programs() {
  /* Grouped so each faculty reads as its own panel instead of one ragged grid. */
  const byFaculty = useMemo(
    () =>
      FACULTIES.map((f) => ({
        ...f,
        programs: GRADUATION_PROGRAMS.filter((p) => p.faculty === f.key),
      })),
    [],
  );

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
          <Label className="mt-14">Intermediate · 2 years</Label>
        </Reveal>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INTERMEDIATE_GROUPS.map((g, i) => (
            <Reveal key={g.slug} delay={i * 70}>
              <Link
                to="/programs#intermediate"
                className="card card-hover group block h-full overflow-hidden"
              >
                <Img
                  src={g.image}
                  alt=""
                  className="aspect-[16/10] w-full"
                  imgClassName="transition-transform duration-700 ease-spring group-hover:scale-105"
                />
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

        {/* Separates the two stages without needing a full-width block edge. */}
        <Reveal delay={100}>
          <DrawRule className="mt-14" />
        </Reveal>

        {/* Graduation — one panel per faculty */}
        <Reveal delay={100}>
          <Label className="mt-12">Graduation · 4 years · 130 credit hours</Label>
        </Reveal>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {byFaculty.map(({ key, title, strapline, programs }, i) => {
            const Icon = PROGRAM_ICON[key] ?? BookOpen;
            return (
              <Reveal key={key} delay={i * 90}>
                <div className="card h-full p-7 sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                      <p className="text-[12px] uppercase tracking-[0.12em] text-ink-muted">
                        {programs.length} programmes
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[13.5px] leading-relaxed text-ink-muted">{strapline}</p>

                  {/* Five programmes per faculty — a two-column grid would leave
                      a hole in the last row, so this stacks as one list. */}
                  <ul className="mt-6 grid gap-2.5">
                    {programs.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/programs#graduation"
                          className="group flex items-center justify-between gap-2 rounded-lg border border-brand-900/10 px-3.5 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:border-brand-700/30 hover:bg-brand-50"
                        >
                          <span className="truncate">{p.name}</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Departments                                                        */
/* ------------------------------------------------------------------ */

function Departments() {
  const [filter, setFilter] = useState<"all" | "science" | "arts">("all");
  const list = DEPARTMENTS.filter((d) => filter === "all" || d.faculty === filter);

  const tabs = [
    { key: "all", label: "All departments", count: DEPARTMENTS.length },
    {
      key: "science",
      label: "Faculty of Science",
      count: DEPARTMENTS.filter((d) => d.faculty === "science").length,
    },
    {
      key: "arts",
      label: "Faculty of Arts",
      count: DEPARTMENTS.filter((d) => d.faculty === "arts").length,
    },
  ] as const;

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Departments"
          title={`${DEPARTMENTS.length} departments across two faculties.`}
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
                  "flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300",
                  filter === t.key
                    ? "bg-brand-800 text-white shadow-card"
                    : "text-ink-soft hover:bg-brand-50 hover:text-brand-800",
                )}
              >
                {t.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10.5px] tabular-nums transition-colors",
                    filter === t.key ? "bg-white/15 text-white" : "bg-brand-900/[.06] text-ink-muted",
                  )}
                >
                  {t.count}
                </span>
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
/* Facilities                                                         */
/* ------------------------------------------------------------------ */

const FACILITY_ICON: Record<string, LucideIcon> = {
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
                    <Icon className="h-[22px] w-[22px]" />
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
/* Page                                                               */
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