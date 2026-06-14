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
          navy: "#080E1A",
          "navy-mid": "#0F1C2E",
          blue: "#2B7FD4",
          "blue-dark": "#1A5FA8",
          "blue-light": "#EBF4FF",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(43,127,212,0.35)",
        "glow-lg": "0 0 80px rgba(43,127,212,0.25)",
        "white-sm": "0 4px 20px rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(135deg, #1A5FA8 0%, #2B7FD4 100%)",
        "dark-gradient": "linear-gradient(160deg, #080E1A 0%, #0F1C2E 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
