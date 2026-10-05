import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Static recreations of the app's screens, drawn with divs so no screenshots
 * are needed. They illustrate layout and content, not pixel-exact UI.
 */

/** Device frame with a status bar and a bottom tab bar. */
function Phone({
  children,
  label,
  tabs,
  className,
}: {
  children: ReactNode;
  label?: string;
  tabs?: string[];
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col items-center", className)}>
      <div className="relative w-full overflow-hidden rounded-[1.75rem] border-[6px] border-brand-950 bg-white shadow-lift">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-brand-950 px-4 pb-1.5 pt-2 text-[8px] font-semibold text-white">
          <span>9:41</span>
          <span aria-hidden className="h-1 w-8 rounded-full bg-white/25" />
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>ICG</span>
          </span>
        </div>

        <div className="h-[330px] overflow-hidden bg-brand-50/40 px-3.5 pb-3 pt-3">{children}</div>

        {/* Tab bar */}
        {tabs && (
          <nav className="flex items-center justify-between border-t border-brand-900/8 bg-white px-3 py-2">
            {tabs.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "text-[7.5px] font-semibold",
                  i === 0 ? "text-brand-700" : "text-ink-muted",
                )}
              >
                {t}
              </span>
            ))}
          </nav>
        )}
      </div>

      {label && (
        <figcaption className="mt-3 text-center text-[12.5px] font-semibold text-ink">{label}</figcaption>
      )}
    </figure>
  );
}

/** Small pill used for stats inside the mockups. */
function Stat({ value, label, tone }: { value: string; label: string; tone?: "gold" | "plain" }) {
  return (
    <div className="rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(12,21,18,.06)]">
      <p
        className={cn(
          "font-display text-[13px] font-semibold leading-none",
          tone === "gold" ? "text-gold-600" : "text-brand-800",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.08em] text-ink-muted">{label}</p>
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="mt-2 space-y-1.5">{children}</div>;
}

/* ------------------------------------------------------------------ */

function LoginScreen() {
  return (
    <Phone label="Sign in">
      <div className="flex h-full flex-col">
        <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 font-display text-sm font-bold text-gold-300">
          ICG
        </div>
        <h4 className="mt-4 text-center font-display text-[13px] font-semibold text-ink">
          Welcome Back
        </h4>
        <p className="mt-1 text-center text-[8px] text-ink-muted">Sign in to continue</p>

        <div className="mt-5 space-y-2">
          <div className="rounded-lg border border-brand-900/10 bg-white px-2.5 py-2 text-[8px] text-ink-muted">
            you@college.edu.pk
          </div>
          <div className="rounded-lg border border-brand-900/10 bg-white px-2.5 py-2 text-[8px] text-ink-muted">
            ••••••••
          </div>
          <div className="flex items-center justify-between text-[7.5px]">
            <span className="flex items-center gap-1 text-ink-soft">
              <span className="h-2 w-2 rounded-[3px] bg-brand-700" /> Remember me
            </span>
            <span className="font-medium text-brand-700">Forgot password?</span>
          </div>
          <div className="rounded-lg bg-brand-700 py-2 text-center text-[9px] font-semibold text-white">
            Sign In
          </div>
        </div>

        <div className="mt-auto flex justify-center gap-1.5 pb-1">
          {["Student", "Teacher", "Admin"].map((r) => (
            <span key={r} className="rounded-full bg-brand-50 px-2 py-0.5 text-[6.5px] font-semibold text-brand-700">
              {r}
            </span>
          ))}
        </div>
      </div>
    </Phone>
  );
}

function StudentScreen() {
  return (
    <Phone label="Student dashboard" tabs={["Home", "Activity", "Profile", "Settings"]}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
            Welcome back
          </p>
          <p className="font-display text-[12px] font-semibold text-ink">Hi, Student!</p>
        </div>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-[8px] font-bold text-brand-700">
          ST
        </span>
      </div>

      <Row>
        <div className="flex items-center justify-between text-[8px] font-semibold text-ink">
          <span>Today's Lectures</span>
          <span className="rounded-full bg-brand-100 px-1.5 py-0.5 text-[7px] text-brand-700">3 Sessions</span>
        </div>
        {[
          { t: "Mathematics", m: "9:00 AM · Room 101 · Prof. Ahmed", c: "bg-emerald-100 text-emerald-700" },
          { t: "Physics", m: "11:00 AM · Lab 3 · Dr. Sarah", c: "bg-sky-100 text-sky-700" },
          { t: "Programming", m: "2:00 PM · Computer Lab · Mr. Ali", c: "bg-amber-100 text-amber-700" },
        ].map((l) => (
          <div key={l.t} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(12,21,18,.06)]">
            <span className={cn("rounded px-1.5 py-0.5 text-[6.5px] font-bold", l.c)}>{l.t.slice(0, 3)}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[8px] font-semibold text-ink">{l.t}</span>
              <span className="block truncate text-[6.5px] text-ink-muted">{l.m}</span>
            </span>
          </div>
        ))}
      </Row>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <Stat value="85%" label="Attendance" tone="gold" />
        <Stat value="2,400" label="Pending Fees" />
      </div>
    </Phone>
  );
}

function TeacherScreen() {
  return (
    <Phone label="Teacher dashboard" tabs={["Home", "My Students", "Profile", "Settings"]}>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-[8px] font-bold text-gold-300">
          PA
        </span>
        <div>
          <p className="font-display text-[11px] font-semibold leading-tight text-ink">Prof. Ahmed</p>
          <p className="text-[7px] text-ink-muted">Computer Science</p>
        </div>
      </div>

      <Row>
        <div className="rounded-lg bg-brand-800 px-2.5 py-2 text-white">
          <p className="text-[7px] font-semibold uppercase tracking-[0.1em] text-gold-300">Now</p>
          <p className="mt-0.5 text-[8.5px] font-semibold">Subject: Database</p>
          <p className="text-[7px] text-brand-100/70">9:00 AM · BS-CS-3A</p>
        </div>
      </Row>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <Stat value="128" label="Students" />
        <Stat value="12" label="Lectures" />
      </div>

      <Row>
        <p className="text-[8px] font-semibold text-ink">Quick Actions</p>
        <div className="grid grid-cols-2 gap-1.5">
          {["Take Attendance", "Add Lecture", "Upload Result", "Announce"].map((a) => (
            <span
              key={a}
              className="rounded-lg bg-white px-2 py-1.5 text-center text-[7px] font-medium text-brand-700 shadow-[0_1px_2px_rgba(12,21,18,.06)]"
            >
              {a}
            </span>
          ))}
        </div>
      </Row>
    </Phone>
  );
}

function AttendanceScreen() {
  const subjects = [
    { c: "DS", n: "Database Systems", d: "12 present, 1 absent", p: "92%" },
    { c: "WD", n: "Web Development", d: "10 present, 2 absent", p: "83%" },
    { c: "MA", n: "Mathematics", d: "12 present, 1 absent", p: "92%" },
  ];

  return (
    <Phone label="Attendance records" tabs={["Home", "Activity", "Profile", "Settings"]}>
      <div className="rounded-xl bg-white p-3 text-center shadow-[0_1px_2px_rgba(12,21,18,.06)]">
        <p className="font-display text-[26px] font-semibold leading-none text-brand-800">85%</p>
        <p className="mt-1 text-[7px] text-ink-muted">
          <span className="font-semibold text-ink">34</span> / 40 classes attended
        </p>
        <div className="mt-2 flex justify-center gap-3 text-[7px]">
          <span className="flex items-center gap-1 text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Present
          </span>
          <span className="flex items-center gap-1 text-amber-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Leave
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Absent
          </span>
        </div>
      </div>

      <Row>
        <p className="text-[7px] font-semibold uppercase tracking-[0.1em] text-ink-muted">Subjects</p>
        {subjects.map((s) => (
          <div key={s.c} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(12,21,18,.06)]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-50 text-[7px] font-bold text-brand-700">
              {s.c}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[8px] font-semibold text-ink">{s.n}</span>
              <span className="block truncate text-[6.5px] text-ink-muted">{s.d}</span>
            </span>
            <span
              className={cn(
                "text-[9px] font-semibold",
                Number(s.p.replace("%", "")) >= 85 ? "text-emerald-600" : "text-amber-600",
              )}
            >
              {s.p}
            </span>
          </div>
        ))}
      </Row>
    </Phone>
  );
}

function TimetableScreen() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = [
    ["DB Systems", "Web Dev", "Math", "DB Systems", "Web Dev"],
    ["Math", "Physics", "Physics", "Lab", "Math"],
  ];

  return (
    <Phone label="Weekly timetable" tabs={["Home", "Activity", "Profile", "Settings"]}>
      <p className="text-[8px] font-semibold text-ink">Timetable</p>
      <div className="mt-2 overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(12,21,18,.06)]">
        <div className="grid grid-cols-5 border-b border-brand-900/8">
          {days.map((d) => (
            <span key={d} className="py-1 text-center text-[6.5px] font-bold text-brand-700">
              {d}
            </span>
          ))}
        </div>
        {slots.map((row, ri) => (
          <div key={ri} className="grid grid-cols-5 border-b border-brand-900/5 last:border-0">
            {row.map((c, ci) => (
              <span
                key={ci}
                className={cn(
                  "border-r border-brand-900/5 px-0.5 py-1.5 text-center text-[5.5px] font-medium leading-tight last:border-r-0",
                  ci % 2 === 0 ? "bg-brand-50/70 text-brand-800" : "bg-gold-50/70 text-gold-800",
                )}
              >
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>

      <Row>
        <p className="text-[7px] font-semibold uppercase tracking-[0.1em] text-ink-muted">Also available</p>
        <div className="grid grid-cols-3 gap-1.5">
          {["Struck-off", "PDF Notes", "Exams"].map((x) => (
            <span key={x} className="rounded-lg bg-white px-1 py-2 text-center text-[6.5px] font-medium text-brand-700 shadow-[0_1px_2px_rgba(12,21,18,.06)]">
              {x}
            </span>
          ))}
        </div>
      </Row>
    </Phone>
  );
}

/** The gallery rendered by the mobile app page. */
export function AppScreensGallery({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      <LoginScreen />
      <StudentScreen />
      <TeacherScreen />
      <AttendanceScreen />
      <TimetableScreen />
    </div>
  );
}