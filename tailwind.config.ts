import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          navy: "#0B1628",
          "navy-mid": "#0F1C2E",
          blue: "#2B7FD4",
          "blue-dark": "#1A5FA8",
          "blue-light": "#EBF4FF",
          "blue-glow": "rgba(43,127,212,0.15)",
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(11,22,40,0.08), 0 1px 2px -1px rgba(11,22,40,0.06)",
        "card-hover": "0 8px 32px 0 rgba(11,22,40,0.14), 0 2px 8px -2px rgba(43,127,212,0.12)",
        premium: "0 4px 32px 0 rgba(11,22,40,0.18)",
        "navy-sm": "0 2px 8px 0 rgba(11,22,40,0.20)",
        glow: "0 0 40px 0 rgba(43,127,212,0.25)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "dot-pattern": "radial-gradient(rgba(43,127,212,0.3) 1px, transparent 1px)",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 65% 30%, rgba(43,127,212,0.18) 0%, transparent 70%)",
        "blue-gradient": "linear-gradient(135deg, #1A5FA8 0%, #2B7FD4 100%)",
        "navy-gradient": "linear-gradient(180deg, #0B1628 0%, #0F1C2E 100%)",
      },
      backgroundSize: {
        "dot-sm": "20px 20px",
        "dot-md": "28px 28px",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-right": "slideRight 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
