/**
 * Every piece of copy on the site lives here, so the college can update
 * content without touching any layout code.
 */

export const SITE = {
  shortName: "GIC",
  /** Compact mark for narrow screens, where the full name would wrap. */
  nameShort: "GIC Gujranwala",
  name: "Government Islamia Graduate College",
  nameFull: "Government Islamia Graduate College, Gujranwala",
  tagline: "Est. 1917",
  descriptor: "A century-old public institution of higher learning in Gujranwala, Punjab.",
  established: 1917,

  address: {
    line1: "Islamia College Road, Abadi Muhammad Bakhsh",
    line2: "Gujranwala, Punjab, Pakistan",
    mapsQuery: "Government Islamia Graduate College Gujranwala",
  },

  phones: [
    { label: "College Office", number: "+92 55 4223484", href: "tel:+92554223484" },
    { label: "Principal's Office", number: "+92 55 4226300", href: "tel:+92554226300" },
    { label: "Chemistry Department", number: "+92 55 4212956", href: "tel:+92554212956" },
    { label: "Computer Department", number: "+92 55 4210116", href: "tel:+92554210116" },
  ],

  emails: [
    { label: "Principal", address: "prinipal@gicg.edu.pk" },
    { label: "General", address: "gic.cr.grw@gmail.com" },
  ],

  /** Staff, teacher and student login for the management portal. */
  portal: {
    label: "Staff Portal",
    description:
      "Sign in to the college management portal for attendance, marks, fees and leave.",
    href: "https://delight-admin-portal.sohaibsheikh6299.workers.dev/",
  },

  /**
 * Mobile app downloads.
 *
 * `apkUrl` points at GitHub Releases' `latest` alias, which is *stable*:
 * publish a new release and this URL serves the newest APK with no code
 * change here. That is how a future APK replaces the current one.
 *
 * Once the app is on Google Play, set `playStoreUrl` and every download
 * button on the site switches to the Play Store automatically — the APK
 * button stays available as a fallback for devices without Play.
 */
  app: {
    name: "ICG University",
    packageName: "com.example.icg",
    tagline: "Attendance, lectures, exams, fees and notices — in your pocket.",
    blurb:
      "The college management app for students, teachers and staff of Government Islamia Graduate College, Gujranwala.",
    android: {
      apkUrl:
        "https://github.com/ZaidAli2005/ICG-Webiste/releases/latest/download/gic-gujranwala.apk",
      fileName: "gic-gujranwala.apk",
      version: "1.0.0",
      size: "94 MB",
      /** android:minSdkVersion="21" in the built manifest. */
      minAndroid: "Android 5.0 or later",
    },
    /** null = offer the APK. Set a URL once the Play listing is live. */
    playStoreUrl: null as string | null,
  },

  socials: [
    {
      label: "Facebook",
      href: "https://web.facebook.com/GovtIslamia-Graduate-College-Gujranwala-197955800249053",
    },
  ],

  /** Images are served from the college's own existing web space. */
  media: {
    logo: "https://gicg.edu.pk/img/logo.png",
    logoMark: "https://gicg.edu.pk/img/logo-only.png",
    hero: [
      "https://gicg.edu.pk/img/home_3.jpg",
      "https://gicg.edu.pk/img/img1.jpg",
      "https://gicg.edu.pk/img/img2.jpg",
      "https://gicg.edu.pk/img/slider%20(1).jpeg",
      "https://gicg.edu.pk/img/slider%20(2).jpeg",
      "https://gicg.edu.pk/img/slider%20(3).jpeg",
      "https://gicg.edu.pk/img/slider%20(4).jpeg",
    ],
    principal: "https://gicg.edu.pk/img/Principle.jpeg",
    graduation: "https://gicg.edu.pk/img/graduation.jpg",
    intermediate: "https://gicg.edu.pk/img/Inter.png",
    science: "https://gicg.edu.pk/img/Science.jpg",
    arts: "https://gicg.edu.pk/img/Arts.jpg",
    admission: "https://gicg.edu.pk/img/Admission.jpg",
  },
} as const;

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Faculty", to: "/faculty" },
  { label: "Departments", to: "/departments" },
  { label: "Programs", to: "/programs" },
  { label: "Admissions", to: "/admissions" },
  { label: "Campus Life", to: "/campus-life" },
  { label: "Mobile App", to: "/app" },
  { label: "Contact", to: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Heritage                                                            */
/* ------------------------------------------------------------------ */

export type Milestone = { year: string; title: string; body: string };

export const MILESTONES: Milestone[] = [
  {
    year: "1917",
    title: "The founding years",
    body: "The institution opened on 30 March 1917 as “Guru Nanak Khalsa College, Gujranwala”. Its original building was funded and constructed by the Guru Nanak Khalsa Educational Trust.",
  },
  {
    year: "1947",
    title: "A new name, a new guardian",
    body: "After Partition, Anjuman-e-Islamia Gujranwala took possession of the college on 25 November 1947. It was renamed Islamia College, Gujranwala.",
  },
  {
    year: "1972",
    title: "Nationalised",
    body: "On 1 September 1972 the college was nationalised and formally became Government Islamia College, Gujranwala — bringing higher education within reach of the district.",
  },
  {
    year: "1990",
    title: "Postgraduate status",
    body: "The college was upgraded to postgraduate level, opening M.A. Urdu and M.A. Political Science — the first master's programmes on campus.",
  },
  {
    year: "2005",
    title: "Science expands",
    body: "An M.Sc. Chemistry department was established in a dedicated new block, strengthening the science faculty's research and teaching base.",
  },
  {
    year: "2012",
    title: "A state-of-the-art block",
    body: "M.Sc. Zoology was launched in a purpose-built block. M.A. Islamiat, M.A. English, M.A. Economics and B.Com followed, running successfully from 2012 to 2020.",
  },
  {
    year: "2020",
    title: "The four-year degree",
    body: "Following directions of the Higher Education Department, Government of the Punjab, the BS (Four Year) programme began at the college in Chemistry, Economics, English, Information Security, Islamiyat, Mathematics, Physics, Political Science, Urdu and Zoology.",
  },
];

/** Office hours shown on the contact page — update here if they change. */
export const OFFICE_HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 2:30 PM" },
  { day: "Saturday", time: "8:00 AM – 12:00 PM" },
  { day: "Sunday & public holidays", time: "Closed" },
];

/** Quick routes for the most common reasons people contact a college. */
export const ENQUIRY_TYPES = [
  { value: "admission", label: "Admissions" },
  { value: "prospectus", label: "Prospectus availability" },
  { value: "fees", label: "Fees & dues" },
  { value: "result", label: "Results & transcripts" },
  { value: "department", label: "A department" },
  { value: "other", label: "Something else" },
];

export const MISSION =
  "To provide a sound intellectual and scholastic foundation for the ideological, moral, social, economical and technological development of Pakistan's new generation, according to the teachings of Islam.";

export const VISION =
  "To remain the most trusted public institution of higher learning in Gujranwala — combining a century of academic heritage with the modern four-year degree, and graduating students who are capable, principled and useful to society.";

export const PRINCIPAL = {
  name: "Prof. Dr. Muhammad Akram Virk",
  role: "Principal",
  photo: SITE.media.principal,
  quote: "Education is the key to success in life, and teachers make a lasting impact in the lives of their students.",
  body: [
    "As Principal of this College, I feel privileged to welcome you to the Government Islamia Graduate College, Gujranwala. We are delighted that you are considering this institution as a suitable place to begin — or continue — your professional and academic education.",
    "We are driven by one guiding principle: to provide good quality educational services. In pursuit of it, this college has undergone outstanding transformation since its inception in 1917.",
    "We believe in value-based education, and that is what sets us apart. During your years here you will be taught and guided by highly qualified, experienced and caring teachers. You will receive personal attention, and support from the college administration in line with your needs and inclinations.",
    "The journey of a thousand miles begins with a single step. I wish you the very best.",
  ],
};

/* ------------------------------------------------------------------ */
/* Departments                                                         */
/* ------------------------------------------------------------------ */

export type Department = {
  slug: string;
  name: string;
  faculty: "science" | "arts";
  blurb: string;
};

export const DEPARTMENTS: Department[] = [
  // Faculty of Science
  { slug: "botany-zoology-biology", name: "Botany, Zoology & Biology", faculty: "science", blurb: "Life sciences from field botany and zoology to the molecular foundations of biology." },
  { slug: "chemistry", name: "Chemistry", faculty: "science", blurb: "Physical, organic and inorganic chemistry, supported by a dedicated M.Sc. block." },
  { slug: "computer-science", name: "Computer Science", faculty: "science", blurb: "Programming, data structures, operating systems and software engineering, with dedicated computer labs." },
  { slug: "mathematics", name: "Mathematics", faculty: "science", blurb: "Pure and applied mathematics — analysis, algebra, numerical methods and statistics." },
  { slug: "physics", name: "Physics", faculty: "science", blurb: "Mechanics, optics, thermodynamics and electronics with laboratory-based instruction." },
  { slug: "statistics", name: "Statistics", faculty: "science", blurb: "Probability, statistical inference, sampling theory and computing for data." },
  { slug: "ctis", name: "Computer Teachers (CTIs)", faculty: "science", blurb: "A dedicated track for students who intend to teach computer science in schools." },

  // Faculty of Arts
  { slug: "arabic-islamic-studies", name: "Arabic & Islamic Studies", faculty: "arts", blurb: "Classical Arabic language and literature alongside Islamic history, jurisprudence and thought." },
  { slug: "economics", name: "Economics", faculty: "arts", blurb: "Micro and macroeconomics, development economics, statistics and econometrics." },
  { slug: "english", name: "English", faculty: "arts", blurb: "Literature, linguistics, rhetoric and the communication skills every graduate needs." },
  { slug: "political-science", name: "Political Science", faculty: "arts", blurb: "Political theory, Pakistan's constitutional and political systems, and international relations." },
  { slug: "library-science-social-work", name: "Library Science & Social Work", faculty: "arts", blurb: "Information and library management, cataloguing, and the theory and practice of social welfare." },
  { slug: "pak-studies-history", name: "Pak Studies & History", faculty: "arts", blurb: "The history of Pakistan and the wider region, with the study of Pakistan's geography, society and culture." },
  { slug: "urdu-punjabi", name: "Urdu & Punjabi", faculty: "arts", blurb: "Urdu and Punjabi language, literature, criticism and creative writing." },
];

export const FACULTIES = [
  {
    key: "science" as const,
    title: "Faculty of Science",
    strapline: "Observation, experiment and proof.",
    image: SITE.media.science,
    intro:
      "The Faculty of Science carries the college's longest tradition of postgraduate teaching, and now offers the full four-year BS degree in the pure and applied sciences alongside M.Sc. programmes in Chemistry and Zoology.",
  },
  {
    key: "arts" as const,
    title: "Faculty of Arts",
    strapline: "Language, society and interpretation.",
    image: SITE.media.arts,
    intro:
      "The Faculty of Arts spans language, literature, economics, politics and Islamic thought — subjects that teach students to read a society, then to argue clearly about it.",
  },
];

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

export type Program = {
  slug: string;
  name: string;
  faculty: "science" | "arts";
  /** External reference — the Punjab University programme page. */
  ref?: string;
  refLabel?: string;
};

export const GRADUATION_PROGRAMS: Program[] = [
  { slug: "bs-english", name: "BS English", faculty: "arts", ref: "http://pu.edu.pk/program/show/900419/Institute-of-English-Studies", refLabel: "Institute of English Studies" },
  { slug: "bs-urdu", name: "BS Urdu", faculty: "arts", ref: "http://pu.edu.pk/program/show/900469/Institute-of-Urdu-Language--Literature", refLabel: "Institute of Urdu Language & Literature" },
  { slug: "bs-political-science", name: "BS Political Science", faculty: "arts", ref: "http://pu.edu.pk/program/show/900214/Department-of-Political-Science", refLabel: "Department of Political Science" },
  { slug: "bs-economics", name: "BS Economics", faculty: "arts", ref: "http://pu.edu.pk/program/show/900371/School-of-Economics", refLabel: "School of Economics" },
  { slug: "bs-islamic-studies", name: "BS Islamic Studies", faculty: "arts", ref: "http://pu.edu.pk/program/show/3301/Sheikh-Zayed-Islamic-Centre", refLabel: "Sheikh Zayed Islamic Centre" },
  { slug: "bs-mathematics", name: "BS Mathematics", faculty: "science", ref: "http://pu.edu.pk/program/show/5101/Department-of-Mathematics", refLabel: "Department of Mathematics" },
  { slug: "bs-physics", name: "BS Physics", faculty: "science", ref: "http://pu.edu.pk/program/show/5501/Department-of-Physics", refLabel: "Department of Physics" },
  { slug: "bs-chemistry", name: "BS Chemistry", faculty: "science", ref: "http://pu.edu.pk/program/show/4401/School-of-Chemistry", refLabel: "School of Chemistry" },
  { slug: "bs-zoology", name: "BS Zoology", faculty: "science", ref: "http://pu.edu.pk/program/show/6301/Institute-of-Zoology", refLabel: "Institute of Zoology" },
  { slug: "bs-computer-science", name: "BS Computer Science", faculty: "science", ref: "http://pu.edu.pk/program/show/900097/Department-of-Computer-Science", refLabel: "Department of Computer Science" },
];

/** Admission brochure lists this department as Information Technology. */
export const IT_DEPARTMENT_LABEL = "Department of Information Technology";

export const INTERMEDIATE_GROUPS = [
  { slug: "science", name: "Science Group", streams: "Pre-Medical · Pre-Engineering", image: SITE.media.science },
  { slug: "general-science", name: "General Science Group", streams: "ICS (Intermediate in Computer Science)", image: SITE.media.science },
  { slug: "commerce", name: "Commerce Group", streams: "I.COM (Intermediate in Commerce)", image: SITE.media.graduation },
  { slug: "arts", name: "Arts Group", streams: "FA (Intermediate in Arts)", image: SITE.media.arts },
];

/* ------------------------------------------------------------------ */
/* Admissions                                                          */
/* ------------------------------------------------------------------ */

export const INTERMEDIATE_CRITERIA = [
  { group: "Science Group", detail: "Pre-Medical group and Pre-Engineering group" },
  { group: "General Science Group", detail: "ICS — Intermediate in Computer Science" },
  { group: "Commerce Group", detail: "I.COM — Intermediate in Commerce" },
  { group: "Arts Group", detail: "FA — Intermediate in Arts" },
];

/** Every graduation department shares the same published criteria. */
export const GRADUATION_CRITERIA = [
  { label: "Eligibility", value: "12 years of education" },
  { label: "Minimum result", value: "Intermediate, at least Second Division" },
  { label: "Credit hours", value: "130" },
  { label: "Duration", value: "4 years" },
];

export const INTERMEDIATE_CRITERIA_SHARED = [
  { label: "Eligibility", value: "10 years of education" },
  { label: "Criteria", value: "Basic" },
  { label: "Duration", value: "2 years" },
];

export const REQUIRED_DOCUMENTS = [
  { item: "Photographs", copies: "6" },
  { item: "Photocopy of result card", copies: "3" },
  { item: "Photocopy of character certificate", copies: "1" },
  { item: "Photocopy of father or guardian's I.D. Card", copies: "1" },
  { item: "Photocopy of Form “B”", copies: "1" },
];

export const ADMISSION_PROCEDURE: string[] = [
  "Admission to Intermediate and Degree classes opens as soon as the Matric and Intermediate results are announced.",
  "Admission is conducted strictly on merit, according to the policy laid down by the Punjab Education Department.",
  "Applications may only be submitted on the forms printed in the official prospectus.",
  "The age limit is 18 years for admission to the first year and 21 years for admission to the third year.",
  "A candidate who passed an examination before the current year must attach an affidavit proving he was not admitted to any other institution in the interim.",
  "Only those candidates whose previous examination is no more than two years old will be considered eligible.",
  "Students belonging to areas outside the range of the Gujranwala Board or University must submit an NOC.",
  "Applicants must present themselves in person, with their file of attested documents, in the company of a parent or guardian.",
  "The admission of any applicant may be denied or cancelled by the Principal without giving any reason.",
];

/* ------------------------------------------------------------------ */
/* Campus                                                              */
/* ------------------------------------------------------------------ */

export type Facility = { title: string; body: string; icon: string };

export const FACILITIES: Facility[] = [
  {
    icon: "Library",
    title: "Library",
    body: "A college library supporting every faculty — reference material, lending collections and quiet reading space for study.",
  },
  {
    icon: "Monitor",
    title: "Computer Laboratories",
    body: "Separate computer labs so that practical work in programming, office applications and design is never squeezed onto a single machine.",
  },
  {
    icon: "Microscope",
    title: "Science Laboratories",
    body: "Dedicated laboratories for Physics, Chemistry, Zoology and Botany, supporting the BS and M.Sc. programmes on campus.",
  },
  {
    icon: "Landmark",
    title: "College Museum",
    body: "An in-building museum that preserves the college's academic and institutional heritage for students to study.",
  },
  {
    icon: "Users",
    title: "Qualified Instructors",
    body: "Experienced, caring teaching staff across both faculties, with personal attention to each student rather than assembly-line lecturing.",
  },
  {
    icon: "Building2",
    title: "Purpose-Built Blocks",
    body: "The campus grew in stages — the M.Sc. Chemistry block of 2005 and the state-of-the-art Zoology block of 2012 were both built for the programmes they house.",
  },
];

export const STATS = [
  { value: "1917", label: "Founded", suffix: "" },
  { value: "100", label: "Years of teaching", suffix: "+" },
  { value: "17", label: "Departments", suffix: "" },
  { value: "20", label: "BS programmes", suffix: "+" },
] as const;

