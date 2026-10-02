import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DEPARTMENTS, FACULTIES } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { CallToAction } from "@/components/layout/CallToAction";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const FACULTY_TONE = {
  science: {
    chip: "bg-brand-50 text-brand-700",
    accent: "text-brand-700",
    bar: "bg-brand-600",
  },
  arts: {
    chip: "bg-gold-50 text-gold-700",
    accent: "text-gold-700",
    bar: "bg-gold-400",
  },
} as const;

export default function Departments() {
  const [active, setActive] = useState<"science" | "arts">("science");

  const list = useMemo(() => DEPARTMENTS.filter((d) => d.faculty === active), [active]);
  const faculty = FACULTIES.find((f) => f.key === active)!;

  return (
    <>
      <PageHero
        breadcrumb="Departments"
        eyebrow="Academic Departments"
        title="Seventeen departments. Two faculties. One campus."
        lede="The Faculty of Science carries the college's postgraduate tradition; the Faculty of Arts covers language, society and Islamic thought. Both teach the Intermediate and BS programmes."
      />

      {/* Faculty switcher */}
      <section className="border-b border-brand-900/10 bg-white">
        <div className="container-page py-10">
          <div className="grid gap-5 lg:grid-cols-2">
            {FACULTIES.map((f, i) => {
              const isActive = active === f.key;
              const count = DEPARTMENTS.filter((d) => d.faculty === f.key).length;
              return (
                <Reveal key={f.key} delay={i * 80}>
                  <button
                    type="button"
                    onClick={() => setActive(f.key)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ease-spring",
                      isActive
                        ? "border-transparent shadow-lift"
                        : "border-brand-900/10 hover:-translate-y-0.5 hover:shadow-card",
                    )}
                  >
                    {/* Gradient backing for the active card */}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950"
                      />
                    )}

                    <div className="relative flex items-start gap-5">
                      <Img
                        src={f.image}
                        alt=""
                        className={cn(
                          "hidden h-20 w-24 shrink-0 rounded-xl transition-all duration-500 sm:block",
                          !isActive && "grayscale",
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <h2
                            className={cn(
                              "font-display text-xl font-semibold transition-colors",
                              isActive ? "text-white" : "text-ink",
                            )}
                          >
                            {f.title}
                          </h2>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                              isActive ? "bg-white/15 text-white" : FACULTY_TONE[f.key].chip,
                            )}
                          >
                            {count} departments
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-1.5 text-[13px] font-medium italic",
                            isActive ? "text-gold-300" : FACULTY_TONE[f.key].accent,
                          )}
                        >
                          {f.strapline}
                        </p>
                        <p
                          className={cn(
                            "mt-3 text-[13.5px] leading-relaxed",
                            isActive ? "text-white/70" : "text-ink-muted",
                          )}
                        >
                          {f.intro}
                        </p>
                      </div>
                    </div>

                    {isActive && <span className="absolute inset-x-0 bottom-0 h-1 bg-gold-400" />}
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Department list */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={faculty.title}
            title={`${list.length} departments`}
            lede={`Departments currently listed under the ${faculty.title}.`}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d, i) => (
              <Reveal key={d.slug} delay={i * 45}>
                <article className="card card-hover group relative h-full overflow-hidden p-6">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform [transition-duration:400ms] ease-spring group-hover:scale-x-100",
                      FACULTY_TONE[d.faculty].bar,
                    )}
                  />
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-ink">
                    {d.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">{d.blurb}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 rounded-2xl border border-brand-900/10 bg-white p-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10">
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  Not sure which programme fits?
                </h3>
                <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-ink-muted">
                  Review the Intermediate groups and the BS programmes side by side, including credit
                  hours, duration and the official Punjab University reference for each.
                </p>
              </div>
              <Link to="/programs" className="btn-primary btn-sm mt-6 shrink-0 lg:mt-0">
                Browse programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}