import { useMemo, useState } from "react";
import { BadgeCheck, Search, Mail, Phone, X } from "lucide-react";
import { FACULTY_GROUPS, FACULTY_TOTAL } from "@/data/faculty";
import { PageHero } from "@/components/layout/PageHero";
import { CallToAction } from "@/components/layout/CallToAction";
import { FacultyAvatar } from "@/components/ui/FacultyAvatar";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type Scope = "all" | "science" | "arts";

export default function Faculty() {
  const [scope, setScope] = useState<Scope>("all");
  const [dept, setDept] = useState<string>("all");
  const [query, setQuery] = useState("");

  const deptsForScope = useMemo(
    () => FACULTY_GROUPS.filter((g) => scope === "all" || g.faculty === scope),
    [scope],
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return deptsForScope
      .filter((g) => dept === "all" || g.slug === dept)
      .flatMap((g) =>
        g.members
          .filter(
            (m) =>
              !q ||
              m.name.toLowerCase().includes(q) ||
              m.designation.toLowerCase().includes(q) ||
              m.qualification.toLowerCase().includes(q) ||
              g.dept.toLowerCase().includes(q),
          )
          .map((m) => ({ ...m, dept: g.dept })),
      );
  }, [deptsForScope, dept, query]);

  const withPhoto = useMemo(() => shown.filter((m) => m.image).length, [shown]);

  const scopes: { key: Scope; label: string }[] = [
    { key: "all", label: "All departments" },
    { key: "science", label: "Faculty of Science" },
    { key: "arts", label: "Faculty of Arts" },
  ];

  return (
    <>
      <PageHero
        breadcrumb="Faculty"
        eyebrow="Faculty"
        title="The people who teach here."
        lede={`${FACULTY_TOTAL} teaching staff across ${FACULTY_GROUPS.length} departments, with their photographs, designations and qualifications.`}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Teaching Staff"
            title="Meet the faculty."
            lede="Filter by faculty or department, or search by name."
          />

          {/* Controls */}
          <div className="mt-10 space-y-5">
            {/* Scope */}
            <div className="inline-flex flex-wrap gap-1.5 rounded-full border border-brand-900/10 bg-white p-1.5 shadow-card">
              {scopes.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setScope(s.key);
                    setDept("all");
                  }}
                  aria-pressed={scope === s.key}
                  className={cn(
                    "rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300",
                    scope === s.key
                      ? "bg-brand-800 text-white shadow-card"
                      : "text-ink-soft hover:bg-brand-50 hover:text-brand-800",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Department + search */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative lg:w-80">
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  aria-label="Filter by department"
                  className="w-full appearance-none rounded-full border border-brand-900/12 bg-white py-3 pl-5 pr-11 text-sm font-medium text-ink shadow-card outline-none transition-all focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                >
                  <option value="all">All departments ({deptsForScope.length})</option>
                  {deptsForScope.map((g) => (
                    <option key={g.slug} value={g.slug}>
                      {g.dept} ({g.members.length})
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="relative lg:w-72">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search faculty…"
                  aria-label="Search faculty"
                  className="w-full rounded-full border border-brand-900/12 bg-white py-3 pl-11 pr-10 text-sm text-ink shadow-card outline-none transition-all placeholder:text-ink-muted/70 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted transition-colors hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Result count */}
            <p aria-live="polite" className="text-[13px] text-ink-muted">
              Showing <span className="font-semibold text-ink">{shown.length}</span>
              {shown.length !== FACULTY_TOTAL && ` of ${FACULTY_TOTAL}`} faculty
              {withPhoto > 0 && (
                <span className="text-ink-muted/70"> · {withPhoto} with photographs</span>
              )}
            </p>
          </div>

          {/* Grid */}
          {shown.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shown.map((m, i) => (
                <Reveal key={`${m.dept}-${m.name}`} delay={(i % 8) * 45}>
                  <article
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-900/10 bg-white",
                      "shadow-card transition-all duration-400 ease-spring",
                      "hover:-translate-y-1.5 hover:border-gold-300/40 hover:shadow-lift",
                    )}
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-gradient-to-br from-brand-50 via-brand-100/60 to-gold-50">
                      <FacultyAvatar
                        image={m.image}
                        name={m.name}
                        className="absolute inset-x-0 bottom-0 h-[86%] w-full rounded-none object-cover object-top transition-transform duration-700 ease-spring group-hover:scale-[1.06]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/25 to-transparent"
                      />

                      {m.role && (
                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-950 shadow-lift">
                          <BadgeCheck className="h-3 w-3" />
                          {m.role}
                        </span>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="font-display text-[17px] font-semibold leading-tight text-white">
                          {m.name}
                        </h3>
                        <p className="mt-1 text-[12.5px] font-medium text-gold-300">{m.designation}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[12.5px] font-semibold leading-snug text-brand-700">
                        {m.dept}
                      </p>
                      {m.qualification && (
                        <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
                          {m.qualification}
                        </p>
                      )}

                      <div className="mt-auto space-y-1.5 border-t border-brand-900/8 pt-4">
                        {m.email && (
                          <a
                            href={`mailto:${m.email}`}
                            className="flex items-center gap-2 text-[12px] text-ink-muted transition-colors hover:text-brand-700"
                          >
                            <Mail className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                            <span className="truncate">{m.email}</span>
                          </a>
                        )}
                        {m.phone && (
                          <a
                            href={`tel:${m.phone.replace(/\s+/g, "")}`}
                            className="flex items-center gap-2 text-[12px] text-ink-muted transition-colors hover:text-brand-700"
                          >
                            <Phone className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                            {m.phone}
                          </a>
                        )}
                        {!m.email && !m.phone && (
                          <p className="text-[12px] text-ink-muted/60">Contact via college office</p>
                        )}
                      </div>
                    </div>

                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold-400 transition-transform duration-400 ease-spring group-hover:scale-x-100"
                    />
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-brand-900/15 bg-white px-6 py-16 text-center">
              <p className="font-display text-lg font-semibold text-ink">No faculty match</p>
              <p className="mt-2 text-sm text-ink-muted">
                Try a different name, or clear the department filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDept("all");
                  setScope("all");
                }}
                className="btn-outline btn-sm mt-6"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CallToAction />
    </>
  );
}