import { Link } from "react-router-dom";
import {
  Download,
  ShieldCheck,
  Wifi,
  CalendarDays,
  CreditCard,
  ClipboardList,
  BookOpen,
  Bell,
  ArrowRight,
  Info,
  Play,
  SmartphoneIcon,
} from "lucide-react";
import { SITE } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";

const { app } = SITE;

/** Play Store wins when available; otherwise fall back to the APK. */
const preferPlay = Boolean(app.playStoreUrl);

const FEATURES = [
  { icon: CalendarDays, title: "Daily attendance", body: "Mark and view attendance per subject, without waiting for a register to be passed round." },
  { icon: ClipboardList, title: "Results & assignments", body: "Marks, position and submitted work in one place instead of a noticeboard." },
  { icon: CreditCard, title: "Fees", body: "Check dues and keep receipts on your phone for the whole session." },
  { icon: BookOpen, title: "Admissions", body: "Prospectus details, eligibility criteria and the document checklist, on the go." },
  { icon: Bell, title: "Notices", body: "Announcements from the college office, pushed instead of printed." },
  { icon: Wifi, title: "Works on slow networks", body: "Built to stay usable on a mobile connection rather than assuming Wi-Fi." },
];

const STEPS = [
  {
    title: "Download the APK file",
    body: "Your browser will save a file called gic-gujranwala.apk. Android may show a warning at this stage — that is expected for any app that is not installed from the Play Store.",
  },
  {
    title: "Allow installs from your browser",
    body: "When Android asks, tap Settings and turn on Allow from this source. This permission is per-app; nothing else on your phone is affected, and you can switch it off again after installing.",
  },
  {
    title: "Open the file and install",
    body: "Tap the downloaded APK and confirm Install. The app appears on your home screen within a few seconds.",
  },
  {
    title: "Sign in",
    body: "Open the app and sign in with the same email address you use for the college portal.",
  },
];

export default function AppDownload() {
  return (
    <>
      <PageHero
        breadcrumb="Mobile App"
        eyebrow="Mobile App"
        title="The college, in your pocket."
        lede={app.tagline}
      />

      {/* Download panel */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy + buttons */}
          <div>
            <SectionHeading
              eyebrow="Get the app"
              title="Free, and built for students."
              lede="The app is free to download and carries no advertising. Everything in it is also available on this website, so nothing is locked away."
            />

            <Reveal delay={120}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {/* Primary — Play Store if live, otherwise the APK */}
                {preferPlay ? (
                  <a href={app.playStoreUrl!} target="_blank" rel="noreferrer" className="btn-primary">
                    <Play className="h-4 w-4" />
                    Get it on Google Play
                  </a>
                ) : (
                  <a href={app.android.apkUrl} download={app.android.fileName} className="btn-primary">
                    <Download className="h-4 w-4" />
                    Download APK
                  </a>
                )}

                {/* Secondary — always keep the direct APK as a fallback */}
                {preferPlay && (
                  <a href={app.android.apkUrl} download={app.android.fileName} className="btn-outline">
                    <Download className="h-4 w-4" />
                    Download APK instead
                  </a>
                )}

                <Link to="/contact" className="btn-outline">
                  Report a problem
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            {/* Build details */}
            <Reveal delay={180}>
              <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-brand-900/10 bg-brand-900/10 sm:grid-cols-3">
                {[
                  { label: "Version", value: app.android.version },
                  { label: "File size", value: app.android.size },
                  { label: "Requires", value: app.android.minAndroid },
                ].map((d) => (
                  <div key={d.label} className="bg-white px-5 py-4">
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-ink-muted">
                      {d.label}
                    </dt>
                    <dd className="mt-1 font-display text-[15px] font-semibold text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-gold-400/25 bg-gold-50/50 px-5 py-4 text-[13px] leading-relaxed text-gold-900">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  Installing outside the Play Store means Android will ask you to allow installs from
                  your browser. This is normal for college apps and only affects this one download.
                </span>
              </p>
            </Reveal>
          </div>

          {/* Phone mockup */}
          <Reveal delay={80}>
            <div className="relative mx-auto w-full max-w-[280px]">
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-200/50 via-gold-200/40 to-transparent blur-2xl"
              />
              <div className="relative rounded-[2.25rem] border border-brand-900/12 bg-brand-950 p-2.5 shadow-lift">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-900">
                  <div className="flex items-center justify-between px-5 pb-2 pt-4">
                    <span className="text-[10px] font-semibold text-brand-100/60">9:41</span>
                    <span aria-hidden className="h-1.5 w-10 rounded-full bg-white/25" />
                  </div>

                  <div className="px-5 pb-6 pt-6">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 text-brand-950">
                        <SmartphoneIcon className="h-4 w-4" />
                      </span>
                      <span className="text-[13px] font-semibold text-white">{app.name}</span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                      {[
                        { k: "Attendance", v: "94%", accent: true },
                        { k: "Position", v: "3rd" },
                        { k: "Fees due", v: "Nil", accent: true },
                        { k: "Results", v: "5 sems" },
                      ].map((s) => (
                        <div key={s.k} className="rounded-lg bg-white/[.06] p-3">
                          <p className="text-[9px] uppercase tracking-[0.1em] text-brand-100/50">{s.k}</p>
                          <p
                            className={`mt-0.5 font-display text-[15px] font-semibold ${
                              s.accent ? "text-gold-300" : "text-white"
                            }`}
                          >
                            {s.v}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2">
                      {[68, 45, 82].map((w, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <span className="h-5 w-5 shrink-0 rounded bg-white/10" />
                          <span className="h-1.5 rounded-full bg-white/15" style={{ width: `${w}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section border-t border-brand-900/10 bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="What it does"
            title="Built around what students actually check."
            lede="Attendance, results, fees and notices — the four things that used to mean a queue, a noticeboard or a phone call."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 55}>
                  <article className="card card-hover group h-full p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-[17px] font-semibold text-ink">{f.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">{f.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to install */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="How to install" title="Four steps." />
            <Reveal delay={150}>
              <div className="mt-9 rounded-2xl border border-brand-900/10 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  Is it safe to install?
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  The file is published as a GitHub release on this repository, so its history is
                  visible and every new version is recorded. Once the app reaches the Play Store, Play
                  will take over hosting and updates.
                </p>
              </div>
            </Reveal>
          </div>

          <ol className="space-y-4 lg:col-span-7">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 60}>
                <div className="card flex gap-5 p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-800 font-display text-[14px] font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
