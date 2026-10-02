/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        /* Deep institutional green — heritage + academia */
        brand: {
          50: "#f0f9f6",
          100: "#d8f2ea",
          200: "#b3e5d6",
          300: "#83d1bd",
          400: "#4cb69e",
          500: "#2a9a83",
          600: "#1c7c6a",
          700: "#186357",
          800: "#164f47",
          900: "#14413b",
          950: "#072622",
        },
        /* Warm ceremonial gold for accents, seals, highlights */
        gold: {
          50: "#fdf9ed",
          100: "#faf0cd",
          200: "#f4df94",
          300: "#eec85a",
          400: "#e5ae2c",
          500: "#cf9216",
          600: "#b07114",
          700: "#8c5217",
          800: "#744117",
          900: "#623617",
          950: "#381c07",
        },
        ink: {
          DEFAULT: "#0c1512",
          soft: "#3d4a45",
          muted: "#6b7873",
        },
        paper: "#fbfaf7",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Wrap the addition in calc(): a bare `+` inside clamp() is legal CSS
        // but the minifier strips the surrounding spaces, producing
        // `1.5rem5vw` — an invalid value, so the whole declaration is dropped.
        "display-sm": ["clamp(1.75rem, calc(1.2rem + 2vw), 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.25rem, calc(1.4rem + 3.4vw), 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.75rem, calc(1.5rem + 5vw), 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(12,21,18,.04), 0 8px 24px -12px rgba(12,21,18,.14)",
        lift: "0 2px 4px rgba(12,21,18,.05), 0 24px 48px -20px rgba(12,21,18,.28)",
        ring: "0 0 0 1px rgba(12,21,18,.07), 0 1px 2px rgba(12,21,18,.04)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)",
        "mesh-dark":
          "radial-gradient(60% 80% at 15% 10%, rgba(44,154,131,.35) 0%, transparent 60%), radial-gradient(50% 70% at 85% 20%, rgba(207,146,22,.22) 0%, transparent 60%), radial-gradient(70% 90% at 50% 100%, rgba(24,99,87,.45) 0%, transparent 65%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.22,1,.36,1) both",
        marquee: "marquee 38s linear infinite",
        "slide-down": "slide-down .28s cubic-bezier(.22,1,.36,1) both",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(.22,1,.36,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};