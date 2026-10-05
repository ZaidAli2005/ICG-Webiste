import { Link } from "react-router-dom";
import { ArrowRight, Quote, Target, Eye } from "lucide-react";
import { MILESTONES, MISSION, PRINCIPAL, SITE, VISION, DEPARTMENTS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { CallToAction } from "@/components/layout/CallToAction";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, DarkBand } from "@/components/ui/Section";

export default function About() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="About the College"
        title="From a trust-funded building in 1917 to Punjab's public college of higher learning."
        lede="Government Islamia Graduate College has been teaching in Gujranwala for more than a century — through three names, one nationalisation, and one consistent commitment to affordable higher education."
      />

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-8 lg:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white">
                <Target className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-display-sm font-semibold">Our Mission</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-muted text-pretty">{MISSION}</p>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="card h-full p-8 lg:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400 text-brand-950">
                <Eye className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-display-sm font-semibold">Our Vision</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-muted text-pretty">{VISION}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Full history */}
      <DarkBand className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="History"
            title="A century in seven moments."
            tone="light"
            lede="The college's shape followed the region's needs — first a secondary institution, then a college, then a postgraduate centre, and now a full four-year degree provider."
          />

          <ol className="relative mt-16 space-y-0">
            {/* Spine */}
            <span
              aria-hidden
              className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold-400/70 via-white/15 to-transparent md:left-1/2"
            />

            {MILESTONES.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal
                  key={m.year}
                  as="li"
                  delay={i * 60}
                  className={`relative pb-11 pl-9 md:pl-0 ${
                    right ? "md:pl-14" : "md:pr-14 md:text-right"
                  }`}
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 md:left-1/2 md:-translate-x-1/2"
                  >
                    <span className="block h-[15px] w-[15px] rounded-full border-2 border-brand-950 bg-gold-400 ring-4 ring-gold-400/20" />
                  </span>

                  <div className={right ? "md:ml-0" : "md:ml-auto"}>
                    <p className="font-display text-2xl font-semibold text-gold-300">{m.year}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white">{m.title}</h3>
                    <p className="mt-2.5 max-w-md text-[14px] leading-relaxed text-brand-100/65 text-pretty md:inline-block">
                      {m.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </DarkBand>

      {/* Principal's message */}
      <section className="section bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-2xl">
                <Img
                  src={PRINCIPAL.photo}
                  alt={PRINCIPAL.name}
                  className="aspect-[3/4] w-full"
                  fallbackClassName="from-brand-800 via-brand-700 to-brand-950"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent"
                />
              </div>
              <div className="mt-6">
                <p className="font-display text-xl font-semibold text-ink">{PRINCIPAL.name}</p>
                <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                  {PRINCIPAL.role}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow="From the Principal" title="A message to new and continuing students." />

            <Reveal delay={150}>
              <blockquote className="mt-9 rounded-2xl border border-gold-400/25 bg-gold-50/60 p-7">
                <Quote className="mb-4 h-6 w-6 text-gold-500" aria-hidden />
                <p className="font-display text-xl leading-snug text-ink text-pretty">
                  “{PRINCIPAL.quote}”
                </p>
              </blockquote>
            </Reveal>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-muted">
              {PRINCIPAL.body.map((para, i) => (
                <Reveal key={para.slice(0, 24)} delay={i * 60}>
                  <p className="text-pretty">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <Link to="/admissions" className="btn-primary btn-sm mt-10">
                Admission requirements
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scale */}
      <section className="border-t border-brand-900/10 bg-paper">
        <div className="container-page py-16">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <p className="eyebrow mb-3">Today</p>
                <p className="max-w-xl text-lg leading-relaxed text-ink text-pretty">
                  {DEPARTMENTS.length} departments run across two faculties, teaching Intermediate groups
                  and a 130-credit-hour BS degree from a campus on Islamia College Road.
                </p>
              </div>
              <dl className="flex flex-wrap gap-x-12 gap-y-6">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Established
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-brand-800">
                    {SITE.established}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Location
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-brand-800">Gujranwala</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}