import { BookOpen, Monitor, Microscope, Landmark, Users, Building2, type LucideIcon } from "lucide-react";
import { FACILITIES, SITE } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { CallToAction } from "@/components/layout/CallToAction";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, DarkBand } from "@/components/ui/Section";

const ICONS: Record<string, LucideIcon> = {
  Library: BookOpen,
  Monitor,
  Microscope,
  Landmark,
  Users,
  Building2,
};

const GALLERY = [
  { src: SITE.media.hero[0], label: "College campus" },
  { src: SITE.media.graduation, label: "Graduation" },
  { src: SITE.media.science, label: "Faculty of Science" },
  { src: SITE.media.arts, label: "Faculty of Arts" },
  { src: SITE.media.intermediate, label: "Intermediate studies" },
  { src: SITE.media.principal, label: "Principal" },
];

export default function CampusLife() {
  return (
    <>
      <PageHero
        breadcrumb="Campus Life"
        eyebrow="Campus"
        title="Facilities built for teaching, not display."
        lede="A library, dedicated computer laboratories, science laboratories, an in-building museum and purpose-built academic blocks — all on one campus on Islamia College Road."
      />

      {/* Facilities grid */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Facilities"
            title="What the campus provides."
            lede="Each facility exists to support a specific part of the curriculum — from practical chemistry sessions to quiet library hours before an examination."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map((f, i) => {
              const Icon = ICONS[f.icon] ?? Building2;
              return (
                <Reveal key={f.title} delay={i * 60}>
                  <article className="card card-hover group h-full p-8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-semibold text-ink">{f.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{f.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <DarkBand className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Around Campus"
            title="The college through the years."
            tone="light"
          />

          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.label} delay={i * 50}>
                <figure
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                    i === 0 ? "col-span-2 lg:col-span-2 aspect-16/9" : "aspect-4/3"
                  }`}
                >
                  <Img src={g.src} alt={g.label} className="h-full w-full" />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold-300">
                      {g.label}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </DarkBand>

      {/* Value-based education */}
      <section className="section bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="How we teach"
              title="Value-based education — the part that doesn't fit on a transcript."
            />
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-muted">
              <p className="text-pretty">
                The college's Principal is explicit about what sets this institution apart: students are
                taught and guided by highly qualified, experienced and caring teachers, and they receive
                personal attention alongside support from the administration in line with their needs.
              </p>
              <p className="text-pretty">
                What that means in practice is simple. While the college expects commitment and hard work
                from students, it does not ask them to figure the college out alone — support structures
                exist across both the Intermediate and degree stages.
              </p>
            </div>
          </div>

          <div className="grid gap-4 self-start">
            {[
              { k: "Personal attention", v: "Small-group teaching rather than assembly-line lecturing." },
              { k: "Experienced instructors", v: "Qualified staff across the Faculty of Science and the Faculty of Arts." },
              { k: "Support from administration", v: "Guidance shaped to each student's needs and inclinations." },
              { k: "A clear progression", v: "Intermediate feeds directly into the four-year BS programme." },
            ].map((row, i) => (
              <Reveal key={row.k} delay={i * 60}>
                <div className="card flex gap-5 p-6">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                  <div>
                    <h3 className="font-display text-[15px] font-semibold text-ink">{row.k}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">{row.v}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}