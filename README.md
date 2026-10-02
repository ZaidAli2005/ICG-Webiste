# Government Islamia Graduate College — website

Public-facing marketing site for GIC Gujranwala, built with the same stack as the
admin portal (React + Vite + TypeScript + Tailwind).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Where the content lives

**All copy, contact details and image URLs are in `src/data/site.ts`.** Edit that one
file to change anything on the site — no layout code needs touching.

## Pages

| Route          | Page           | What it covers                                     |
| -------------- | -------------- | -------------------------------------------------- |
| `/`            | Home           | Hero carousel, stats, mission, timeline, programs, departments, facilities |
| `/about`       | About          | Mission, vision, century timeline, Principal's message |
| `/departments` | Departments    | Faculty switcher + all 14 departments              |
| `/programs`    | Programs       | Intermediate groups + BS programmes, with search and faculty filter |
| `/admissions`  | Admissions     | Eligibility, criteria, 9-step procedure, documents checklist |
| `/campus-life` | Campus Life    | Facilities and campus gallery                       |
| `/contact`     | Contact        | Address, all four phone lines, emails, enquiry form |
| `*`            | 404            | —                                                   |

## Images

Photos are hotlinked from the existing site (`https://gicg.edu.pk/img/…`) and declared
in `SITE.media`. Every image renders through `<Img>`, which swaps in a branded
gradient if a file 404s — so a missing photo degrades gracefully instead of
showing a broken icon.

To self-host instead: drop the files into `public/img/` and point `SITE.media` at
`/img/<file>`.

## Design tokens

Defined in `tailwind.config.js` — swap these to rebrand the whole site:

- `brand.*` — deep institutional green (emerald), used for all primary surfaces
- `gold.*` — ceremonial accent for eyebrows, rules and highlights
- `ink.*` / `paper` — text and page background
- `font-display` (Fraunces) for headings, `font-sans` (Inter) for body

## Notes

- Route-level code splitting is on; each page is its own chunk.
- `prefers-reduced-motion` disables the carousel auto-advance and all transitions.
- The contact form has no backend — it composes a `mailto:` in the visitor's client.
  Point it at a real endpoint when one exists.