import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight, Clock, GraduationCap, Layers } from "lucide-react";
import {
  GRADUATION_CRITERIA,
  GRADUATION_PROGRAMS,
  INTERMEDIATE_CRITERIA,
  INTERMEDIATE_CRITERIA_SHARED,
  INTERMEDIATE_GROUPS,
  IT_DEPARTMENT_LABEL,
} from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { CallToAction } from "@/components/layout/CallToAction";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export default function Programs() {
  const [query, setQuery] = useState("");
  const [faculty, setFaculty] = useState<"all" | "science" | "arts">("all");

  const programs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GRADUATION_PROGRAMS.filter(
      (p) =>
        (faculty === "all" || p.faculty === faculty) &&
        (!q || p.name.toLowerCase().includes(q) || (p.refLabel ?? "").toLowerCase().includes(q)),
    );
  }, [query, faculty]);

  const tabs = [
    { key: "all", label: "All" },
    { key: "science", label: "Faculty of Science" },
    { key: "arts", label: "Faculty of Arts" },
  ] as const;

  return (
    <>
      <PageHero
        breadcrumb="Programs"
        eyebrow="Academic Programs"
        title="Two years of Intermediate, then four years of BS."
        lede="Every BS programme carries 130 credit hours over four years and is run with the University of the Punjab. Admission to both stages is strictly on merit."
      />

      {/* Intermediate */}
      <section id="intermediate" className="section scroll-mt-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Stage One"
            title="Intermediate groups"
            lede="Open to students who have completed ten years of education. Each group runs for two years and feeds directly into the BS programmes."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INTERMEDIATE_GROUPS.map((g, i) => (
              <Reveal key={g.slug} delay={i * 60}>
                <article className="card card-hover h-full overflow-hidden">
                  <Img src={g.image} alt="" className="aspect-16/10 w-full" />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-ink">{g.name}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{g.streams}</p>
                    <p className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-700">
                      <Clock className="h-3.5 w-3.5" />
                      2 years
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Criteria tables */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full overflow-hidden">
                <div className="border-b border-brand-900/10 bg-brand-50/60 px-7 py-5">
                  <h3 className="font-display text-base font-semibold text-ink">Groups & Streams</h3>
                </div>
                <ul className="divide-y divide-brand-900/8">
                  {INTERMEDIATE_CRITERIA.map((c) => (
                    <li key={c.group} className="flex flex-wrap justify-between gap-2 px-7 py-4">
                      <span className="font-medium text-ink">{c.group}</span>
                      <span className="text-[13px] text-ink-muted">{c.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="card h-full overflow-hidden">
                <div className="border-b border-brand-900/10 bg-brand-50/60 px-7 py-5">
                  <h3 className="font-display text-base font-semibold text-ink">
                    Common Criteria
                  </h3>
                </div>
                <dl className="divide-y divide-brand-900/8">
                  {INTERMEDIATE_CRITERIA_SHARED.map((c) => (
                    <div key={c.label} className="flex justify-between gap-4 px-7 py-4">
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                        {c.label}
                      </dt>
                      <dd className="text-right text-sm font-medium text-ink">{c.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Graduation */}
      <section id="graduation" className="section scroll-mt-24 border-t border-brand-900/10 bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Stage Two"
            title="BS programmes — four years, 130 credit hours"
            lede="Offered across the Faculty of Science and the Faculty of Arts. Each programme below links to its official Punjab University reference page."
          />

          {/* Criteria strip */}
          <Reveal delay={120}>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-brand-900/10 bg-brand-900/10 sm:grid-cols-2 lg:grid-cols-4">
              {GRADUATION_CRITERIA.map((c) => (
                <div key={c.label} className="bg-white px-6 py-6">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    {c.label === "Duration" ? (
                      <Clock className="h-3.5 w-3.5 text-brand-700" />
                    ) : c.label === "Credit hours" ? (
                      <Layers className="h-3.5 w-3.5 text-brand-700" />
                    ) : (
                      <GraduationCap className="h-3.5 w-3.5 text-brand-700" />
                    )}
                    {c.label}
                  </p>
                  <p className="mt-2.5 font-display text-lg font-semibold text-ink">{c.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Filters */}
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex flex-wrap gap-1.5 rounded-full border border-brand-900/10 bg-paper p-1.5">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setFaculty(t.key)}
                  aria-pressed={faculty === t.key}
                  className={cn(
                    "rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300",
                    faculty === t.key
                      ? "bg-brand-800 text-white shadow-card"
                      : "text-ink-soft hover:bg-brand-50 hover:text-brand-800",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="relative lg:w-80">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search programs…"
                aria-label="Search programs"
                className="w-full rounded-full border border-brand-900/12 bg-white py-3 pl-11 pr-4 text-sm text-ink shadow-card outline-none transition-all placeholder:text-ink-muted/70 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
              />
            </div>
          </div>

          {/* Results */}
          {programs.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {programs.map((p, i) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-brand-700">
                          {p.name}
                        </h3>
                        {p.refLabel && (
                          <p className="mt-1 text-[13px] text-ink-muted">{p.refLabel}</p>
                        )}
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700" />
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-brand-900/8 pt-4 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                      <span>{p.faculty === "science" ? "Faculty of Science" : "Faculty of Arts"}</span>
                      <span aria-hidden className="h-1 w-1 rounded-full bg-gold-400" />
                      <span>130 credit hrs</span>
                    </div>
                  </>
                );

                return (
                  <Reveal key={p.slug} delay={i * 45}>
                    {p.ref ? (
                      <a
                        href={p.ref}
                        target="_blank"
                        rel="noreferrer"
                        className="card card-hover group block h-full p-6"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="card card-hover group h-full p-6">{inner}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal>
              <div className="mt-8 rounded-2xl border border-dashed border-brand-900/15 bg-white px-6 py-16 text-center">
                <p className="font-display text-lg font-semibold text-ink">No programs match</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Try a different search term, or clear the faculty filter.
                </p>
              </div>
            </Reveal>
          )}

          {/* Note */}
          <Reveal>
            <p className="mt-10 rounded-xl border border-gold-400/25 bg-gold-50/50 px-6 py-5 text-[13.5px] leading-relaxed text-gold-900">
              <span className="font-semibold">Note:</span> the college admission brochure lists this
              programme as the{" "}
              <span className="font-semibold">{IT_DEPARTMENT_LABEL}</span>, while the Punjab University
              reference page is published under BS Computer Science. Both names refer to the same
              programme.
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-8 text-center text-sm text-ink-muted">
              Ready to apply?{" "}
              <Link to="/admissions" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
                See the full admission requirements
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}