import { FileText, Phone, Printer, Info, AlertCircle } from "lucide-react";
import {
  ADMISSION_PROCEDURE,
  GRADUATION_CRITERIA,
  INTERMEDIATE_CRITERIA,
  INTERMEDIATE_CRITERIA_SHARED,
  REQUIRED_DOCUMENTS,
  SITE,
} from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { CallToAction } from "@/components/layout/CallToAction";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";

export default function Admissions() {
  return (
    <>
      <PageHero
        breadcrumb="Admissions"
        eyebrow="Admissions"
        title="Admission is conducted strictly on merit."
        image={SITE.media.admission}
        lede="Applications open as soon as the Matric and Intermediate results are announced, following the policy of the Punjab Education Department. Forms are available from the official prospectus."
      >
        <div className="flex flex-wrap gap-3">
          <a href={SITE.phones[0].href} className="btn-gold btn-sm">
            <Phone className="h-4 w-4" />
            {SITE.phones[0].number}
          </a>
          <a href={`mailto:${SITE.emails[0].address}`} className="btn-ghost-light btn-sm">
            <Printer className="h-4 w-4" />
            Prospectus enquiries
          </a>
        </div>
      </PageHero>

      {/* Quick facts */}
      <section className="border-b border-brand-900/10 bg-white">
        <div className="container-page grid gap-px overflow-hidden py-0 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Age limit — first year", value: "18 years" },
            { label: "Age limit — third year", value: "21 years" },
            { label: "Previous exam validity", value: "2 years" },
            { label: "Basis of selection", value: "Merit only" },
          ].map((f, i) => (
            <Reveal key={f.label} delay={i * 60}>
              <div className="border-brand-900/10 py-7 sm:border-r sm:pr-6 lg:last:border-r-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-muted">
                  {f.label}
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold text-brand-800">{f.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Eligibility & Criteria"
            title="What each stage requires."
            lede="The Intermediate stage requires ten years of education. The BS degree requires twelve, plus an Intermediate result of at least Second Division."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Intermediate */}
            <Reveal>
              <div className="card h-full overflow-hidden">
                <div className="flex items-center gap-3 border-b border-brand-900/10 bg-brand-50/60 px-7 py-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">
                      Intermediate Programs
                    </h3>
                    <p className="text-[12px] text-ink-muted">2 years · 10 years of education</p>
                  </div>
                </div>

                <ul className="divide-y divide-brand-900/8">
                  {INTERMEDIATE_CRITERIA.map((c) => (
                    <li key={c.group} className="px-7 py-4">
                      <p className="font-medium text-ink">{c.group}</p>
                      <p className="mt-0.5 text-[13px] text-ink-muted">{c.detail}</p>
                    </li>
                  ))}
                </ul>

                <dl className="divide-y divide-brand-900/8 border-t border-brand-900/10 bg-brand-50/30">
                  {INTERMEDIATE_CRITERIA_SHARED.map((c) => (
                    <div key={c.label} className="flex justify-between gap-4 px-7 py-3.5">
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                        {c.label}
                      </dt>
                      <dd className="text-sm font-medium text-ink">{c.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* Graduation */}
            <Reveal delay={100}>
              <div className="card h-full overflow-hidden">
                <div className="flex items-center gap-3 border-b border-brand-900/10 bg-gold-50/60 px-7 py-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 text-brand-950">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">
                      Graduation Programs
                    </h3>
                    <p className="text-[12px] text-ink-muted">4 years · 12 years of education</p>
                  </div>
                </div>

                <dl className="divide-y divide-brand-900/8">
                  {GRADUATION_CRITERIA.map((c) => (
                    <div key={c.label} className="px-7 py-5">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-muted">
                        {c.label}
                      </dt>
                      <dd className="mt-1.5 text-[15px] font-medium leading-relaxed text-ink">
                        {c.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="border-t border-brand-900/10 bg-gold-50/30 px-7 py-5">
                  <p className="text-[13px] leading-relaxed text-gold-900">
                    These criteria are common to every BS department — English, Urdu, Political Science,
                    Economics, Mathematics, Physics, Chemistry, Zoology, Computer Science and Islamic
                    Studies.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Procedure */}
      <section className="section border-t border-brand-900/10 bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Procedure" title="Nine steps, and one firm rule." />

            <ol className="mt-11 space-y-5">
              {ADMISSION_PROCEDURE.map((step, i) => (
                <Reveal key={step} as="li" delay={i * 50}>
                  <div className="flex gap-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-900/12 bg-paper font-display text-[13px] font-semibold text-brand-800">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-[15px] leading-relaxed text-ink-muted text-pretty">{step}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Documents */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="card sticky top-28 overflow-hidden">
                <div className="border-b border-brand-900/10 bg-brand-900 px-7 py-5">
                  <h3 className="font-display text-base font-semibold text-white">
                    Required Documents
                  </h3>
                  <p className="mt-0.5 text-[12px] text-brand-100/70">
                    Submit with the admission form
                  </p>
                </div>

                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-brand-900/10 bg-brand-50/50">
                      <th scope="col" className="px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                        Document
                      </th>
                      <th scope="col" className="w-20 px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                        Copies
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-900/8">
                    {REQUIRED_DOCUMENTS.map((d) => (
                      <tr key={d.item}>
                        <td className="px-7 py-4 text-[14px] text-ink">{d.item}</td>
                        <td className="px-5 py-4 text-right font-display text-[15px] font-semibold text-brand-800">
                          {d.copies}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-start gap-3 border-t border-gold-400/25 bg-gold-50/60 px-7 py-5">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                  <p className="text-[13px] font-medium leading-relaxed text-gold-900">
                    All documents mentioned above must be attested.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="border-t border-brand-900/10 bg-paper">
        <div className="container-page py-16">
          <Reveal>
            <div className="rounded-2xl border border-brand-900/10 bg-white p-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Info className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Prospectus and admission queries
                  </h3>
                  <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-ink-muted">
                    Forms are only accepted on the official prospectus printout. For availability and
                    submission dates, contact the college office.
                  </p>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
                <a href={SITE.phones[0].href} className="btn-primary btn-sm">
                  <Phone className="h-4 w-4" />
                  {SITE.phones[0].number}
                </a>
                <a href={`mailto:${SITE.emails[0].address}`} className="btn-outline btn-sm">
                  Email the office
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}