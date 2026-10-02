import { BadgeCheck } from "lucide-react";
import { FACULTY } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { CallToAction } from "@/components/layout/CallToAction";
import { FacultyAvatar } from "@/components/ui/FacultyAvatar";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";

export default function Faculty() {
  return (
    <>
      <PageHero
        breadcrumb="Faculty"
        eyebrow="Faculty"
        title="The people who teach here."
        lede="A roster of the college's teaching staff, with their photographs, designations and qualifications."
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Teaching Staff"
            title={`${FACULTY.length} faculty members`}
            lede="Photographs and details as they appear in the college records."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {FACULTY.map((f, i) => (
              <Reveal key={f.specialId} delay={i * 50}>
                <article className="card card-hover group flex h-full flex-col items-center p-7 text-center">
                  <FacultyAvatar
                    image={f.image}
                    name={f.name}
                    lastName={f.lastName}
                    className="h-24 w-24 ring-4 ring-brand-50 transition-all duration-300 group-hover:ring-gold-200"
                  />

                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ink">
                    {f.name} {f.lastName ?? ""}
                  </h3>

                  {f.designation && (
                    <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-700">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {f.designation}
                    </p>
                  )}

                  {f.department && (
                    <p className="mt-1 text-[13px] font-medium text-ink-soft">{f.department}</p>
                  )}

                  {f.qualification && (
                    <p className="mt-2 text-[12.5px] text-ink-muted">{f.qualification}</p>
                  )}

                  <div className="mt-5 flex w-full items-center justify-center gap-2 border-t border-brand-900/8 pt-4 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    <span>{f.specialId}</span>
                    {f.shift && (
                      <>
                        <span aria-hidden className="h-1 w-1 rounded-full bg-gold-400" />
                        <span>{f.shift}</span>
                      </>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}