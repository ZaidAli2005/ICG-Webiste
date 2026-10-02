import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

/** Reused closing band on every page. */
export function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 py-20 sm:py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-dark" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-faint bg-[size:56px_56px]" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow eyebrow-light mb-5 justify-center before:bg-gold-300">
              Admissions Open
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-display-sm font-semibold text-white text-balance">
              A century of teaching, and the next four years of your degree.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-100/75">
              Admission is conducted strictly on merit, in line with the policy of the Punjab Education
              Department. Applications are submitted on the official prospectus forms.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link to="/admissions" className="btn-gold">
                Admission requirements
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE.phones[0].href} className="btn-ghost-light">
                <Phone className="h-4 w-4" />
                {SITE.phones[0].number}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}