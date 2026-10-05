import { Link } from "react-router-dom";
import {
  Download,
  ShieldCheck,
  ArrowRight,
  Info,
  Play,
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  BookOpen,
  FileText,
  CreditCard,
  Sparkles,
  Megaphone,
  Building2,
  Users,
  Lock,
  LogIn,
  MailCheck,
  Clock3,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { SITE } from "@/data/site";
import { APP_FEATURES, APP_ROLES, APP_SECURITY } from "@/data/app";
import { PageHero } from "@/components/layout/PageHero";
import { AppScreensGallery } from "@/components/app/AppScreens";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, DarkBand } from "@/components/ui/Section";
import {
  formatBytes,
  formatReleaseDate,
  useLatestRelease,
} from "@/hooks/useLatestRelease";

const { app } = SITE;

/**
 * The repo that hosts the app's GitHub Releases. Releases are the single source
 * of truth for the version shown here, so publishing a new release updates the
 * page with no code change. Only the repo slug lives in the source.
 */
const GITHUB_REPO = "ZaidAli2005/ICG-Webiste";

/** Feature list carries icon names so the data file stays free of JSX. */
const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  BookOpen,
  FileText,
  CreditCard,
  Sparkles,
  Megaphone,
  Building2,
  ShieldCheck,
};

const SECURITY_ICONS: Record<string, LucideIcon> = {
  "Secure Authentication": ShieldCheck,
  "Smart Login": LogIn,
  "Remember Me": Clock3,
  "Forgot Password": MailCheck,
};

/** Play Store wins when available; otherwise the APK is the primary action. */
const preferPlay = Boolean(app.playStoreUrl);

const STEPS = [
  {
    title: "Download the APK",
    body: "Your browser saves a file called gic-gujranwala.apk. Android will warn you at this stage — that is expected for any app not installed from the Play Store.",
  },
  {
    title: "Allow installs from your browser",
    body: "When Android asks, tap Settings and turn on Allow from this source. The permission is per-app, so nothing else on your phone is affected and you can switch it off again afterwards.",
  },
  {
    title: "Open the file and install",
    body: "Tap the downloaded APK and confirm Install. The app appears on your home screen within a few seconds.",
  },
  {
    title: "Sign in",
    body: "Open the app and sign in with the same email address you use for the college portal. Your role decides which portal you see.",
  },
];

const LatestReleaseInfoInline = ({}) => {
  const { useLatestRelease } = require("@/hooks/useLatestRelease");
  const { formatDate } = require("@/lib/utils");
  const { data, loading, error } = useLatestRelease(GITHUB_REPO);
  
  if (loading) {
    return <p className="text-sm text-ink-muted">Checking for latest version...</p>;
  }
  if (error) {
    return <p className="text-xs text-red-600">{error}</p>;
  }
  if (!data) return null;
  
  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-xl border border-brand-900/10 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Latest Release</p>
            <p className="mt-1 font-display text-lg font-semibold text-brand-800">{data.version}</p>
          </div>
          {data.publishedAt && (
            <p className="text-xs text-ink-muted">Released: {formatDate(data.publishedAt)}</p>
          )}
        </div>
        {data.releaseNotes && (
          <div className="mt-3">
            <p className="text-sm font-semibold text-ink">What's New</p>
            <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-ink-muted">
              {data.releaseNotes}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AppDownload() {
  const releaseState = useLatestRelease(GITHUB_REPO);

  return (
    <>
      <PageHero
        breadcrumb="Mobile App"
        eyebrow={`${app.name} · Android`}
        title="The whole college, in your pocket."
        lede={app.blurb}
      >
        <div className="flex flex-wrap gap-3">
          {preferPlay ? (
            <a
              href={app.playStoreUrl!}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              <Play className="h-4 w-4" />
              Get it on Google Play
            </a>
          ) : (
            <a
              href={releaseState.release?.apkUrl || app.android.apkUrl}
              download={releaseState.release?.apkFileName || app.android.fileName}
              className="btn-gold"
            >
              <Download className="h-4 w-4" />
              Download APK
            </a>
          )}

          {preferPlay && (
            <a
              href={releaseState.release?.apkUrl || app.android.apkUrl}
              download={releaseState.release?.apkFileName || app.android.fileName}
              className="btn-ghost-light"
            >
              <Download className="h-4 w-4" />
              Download APK instead
            </a>
          )}
        </div>

        {releaseState.loading && (
          <p className="mt-4 text-sm text-brand-100/80">
            Checking for latest version...
          </p>
        )}
        {releaseState.error && !releaseState.release?.apkUrl && (
          <p className="mt-4 text-xs text-red-200/90">{releaseState.error}</p>
        )}
      </PageHero>

      {/* Build facts */}
      <section className="border-b border-brand-900/10 bg-white">
        <div className="container-page grid gap-px py-0 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Version",
              value: releaseState.loading
                ? "Checking..."
                : releaseState.release?.version ?? app.android.version,
            },
            {
              label: "Download size",
              value:
                formatBytes(releaseState.release?.apkSize ?? 0) ||
                app.android.size,
            },
            { label: "Requires", value: app.android.minAndroid },
            { label: "Package", value: app.packageName },
          ].map((d, i) => (
            <Reveal key={d.label} delay={i * 55}>
              <div className="border-brand-900/10 py-6 sm:border-r sm:pr-6 lg:last:border-r-0">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-ink-muted">
                  {d.label}
                </p>
                <p className="mt-1.5 break-all font-display text-[15px] font-semibold text-brand-800">
                  {d.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Screens */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="App Screens"
            title="Beautiful, intuitive interface."
            lede="Every screen is built for a single job, so the thing you came to check is never more than a tap away."
          />

          <Reveal delay={100}>
            <AppScreensGallery className="mt-14" />
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <DarkBand className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Core Features"
            title="Everything you need."
            tone="light"
            lede="A comprehensive platform designed for modern college management with real-time updates and a seamless experience."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {APP_FEATURES.map((f, i) => {
              const Icon = ICONS[f.icon] ?? LayoutDashboard;
              return (
                <Reveal key={f.title} delay={i * 50}>
                  <article className="group h-full rounded-2xl border border-white/10 bg-white/[.04] p-7 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-gold-300/30 hover:bg-white/[.07]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-brand-950">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-[17px] font-semibold text-white">{f.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-brand-100/65">{f.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </DarkBand>

      {/* Roles */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="User Roles"
            title="A different portal for everyone."
            lede="The same app, four distinct experiences. Each role sees only the tools and records that belong to them."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APP_ROLES.map((r, i) => (
              <Reveal key={r.role} delay={i * 60}>
                <article className="card card-hover flex h-full flex-col p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Users className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{r.role}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{r.summary}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-brand-900/8 pt-5">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                        <span className="text-[12.5px] leading-relaxed text-ink-soft">{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="section border-t border-brand-900/10">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Security"
              title="Role-based access control."
              lede="Signing in does more than open the app — it decides which parts of the college you are allowed to see."
            />

            <Reveal delay={150}>
              {(() => {
                const date = formatReleaseDate(
                  releaseState.release?.publishedAt ?? "",
                );
                const size = formatBytes(releaseState.release?.apkSize ?? 0);

                return (
                  <div className="mt-9 rounded-2xl border border-brand-900/10 bg-white p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-ink">
                        Latest Android App
                      </h3>
                      {releaseState.revalidating && (
                        <span className="text-xs text-ink-muted">
                          Updating...
                        </span>
                      )}
                    </div>

                    <div className="mt-2 space-y-1.5 text-sm text-ink-muted">
                      <p>
                        Version:{" "}
                        {releaseState.loading
                          ? "Checking..."
                          : releaseState.release?.version ?? app.android.version}
                      </p>
                      {date && (
                        <p>Released: {date}</p>
                      )}
                      {size && <p>Download size: {size}</p>}
                    </div>

                    <a
                      href={
                        releaseState.release?.apkUrl || app.android.apkUrl
                      }
                      download={
                        releaseState.release?.apkFileName ||
                        app.android.fileName
                      }
                      className="btn-gold btn-sm mt-4 inline-flex gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download APK
                    </a>

                    {releaseState.error && !releaseState.release?.apkUrl && (
                      <p className="mt-3 text-xs text-red-600">
                        {releaseState.error}
                      </p>
                    )}

                    {releaseState.release?.releaseNotes && (
                      <div className="mt-4 border-t border-brand-900/10 pt-4">
                        <p className="text-sm font-semibold text-ink">
                          What's New
                        </p>
                        <pre className="mt-2 max-h-60 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-ink-muted">
                          {releaseState.release.releaseNotes}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })()}
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-6 rounded-2xl border border-brand-900/10 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Lock className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  Protected by JWT tokens
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  Sessions are issued as signed tokens and expire on their own, so a shared or stale
                  session cannot be replayed on another device.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {APP_SECURITY.map((s, i) => {
              const Icon = SECURITY_ICONS[s.title] ?? ShieldCheck;
              return (
                <Reveal key={s.title} delay={i * 60}>
                  <article className="card card-hover h-full p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="mt-4 font-display text-[15px] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{s.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Install */}
      <DarkBand className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="How to install" title="Four steps." tone="light" />

            <Reveal delay={120}>
              <div className="mt-9 rounded-2xl border border-gold-300/25 bg-white/[.04] p-6">
                <p className="flex items-start gap-3 text-[13.5px] leading-relaxed text-brand-100/75">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <span>
                    Installing outside the Play Store means Android asks you to allow installs from
                    your browser. This is normal for college apps, affects only this one download, and
                    disappears once the app reaches the Play Store.
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <a
                href={
                  releaseState.release?.apkUrl || app.android.apkUrl
                }
                download={
                  releaseState.release?.apkFileName || app.android.fileName
                }
                className="btn-gold mt-6"
              >
                <Download className="h-4 w-4" />
                Download {app.android.size}
              </a>
            </Reveal>
          </div>

          <ol className="space-y-4 lg:col-span-7">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 60}>
                <div className="card-dark flex gap-5 p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-[14px] font-semibold text-brand-950">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-brand-100/70">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </DarkBand>

      {/* Closing */}
      <section className="bg-white">
        <div className="container-page flex flex-col items-center gap-6 py-16 text-center lg:flex-row lg:justify-between lg:text-left">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-ink">
              Trouble installing, or a problem in the app?
            </h3>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-muted">
              The college office can confirm the version and record any issue with the development
              team.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/contact" className="btn-primary btn-sm shrink-0">
              Contact the college
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}