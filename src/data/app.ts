/**
 * Feature tour content for the mobile app, transcribed from the app's own
 * showcase pages. Kept separate from the general site copy so the app
 * description can be edited without touching the college-wide content.
 */

/** lucide icon names, resolved to components in AppDownload.tsx */
export const APP_FEATURES = [
  { icon: "LayoutDashboard", title: "Dashboard", body: "A real-time overview for students and teachers, with the day's lectures and any items needing attention." },
  { icon: "CalendarCheck", title: "Attendance", body: "QR-code based attendance with real-time notifications, tracked per subject for every class." },
  { icon: "CalendarDays", title: "Timetable", body: "Weekly class schedules with room numbers and the instructor taking each session." },
  { icon: "BookOpen", title: "Lectures", body: "Upload and access lecture materials, notes and past papers without coming to campus." },
  { icon: "FileText", title: "Exams", body: "Exam schedules and results, with analytics showing where a subject needs attention." },
  { icon: "CreditCard", title: "Fees & Funds", body: "Fee tracking, online payment and a full transaction history for the session." },
  { icon: "Sparkles", title: "Activities", body: "Co-curricular activities and events, tracked from application through to completion." },
  { icon: "Megaphone", title: "Announcements", body: "Real-time notifications and college announcements, pushed instead of printed on a noticeboard." },
  { icon: "Building2", title: "Departments", body: "Browse departments and their faculty, with each department's own contact details." },
  { icon: "ShieldCheck", title: "Security", body: "Role-based login secured with JWT tokens, with a separate portal for every role." },
] as const;

export const APP_ROLES = [
  {
    role: "Student",
    summary: "Everything a student checks daily, in one place.",
    points: [
      "Today's lectures with room and instructor",
      "Attendance percentage per subject",
      "Fee alerts before a deadline",
      "Apply for leave, view results, access notes",
    ],
  },
  {
    role: "Teacher",
    summary: "Class and attendance tools built for the working day.",
    points: [
      "Create and manage class groups",
      "QR-code attendance marking",
      "View assigned students and progress",
      "Upload lectures, notes and results",
    ],
  },
  {
    role: "Admin",
    summary: "College-wide records and configuration.",
    points: [
      "Student and staff records",
      "Timetable and exam scheduling",
      "Fee collection and reporting",
      "Announcements to the whole college",
    ],
  },
  {
    role: "Principal",
    summary: "An overview of the whole institution.",
    points: [
      "Enrolment and attendance overview",
      "Department and faculty information",
      "Result and staff summaries",
      "Direct announcements to staff",
    ],
  },
] as const;

export const APP_SECURITY = [
  { title: "Secure Authentication", body: "Role-based login secured with JWT tokens. Each role sees a separate portal, and a student account cannot reach teacher or admin screens." },
  { title: "Smart Login", body: "Sign in with your email address and password. Your session is kept between launches, so you are not asked to log in on every visit." },
  { title: "Remember Me", body: "Stay logged in across sessions without re-entering your password on a device you trust." },
  { title: "Forgot Password", body: "Recover access by email if you cannot remember your password." },
];