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
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          navy: "#0F1C2E",
          blue: "#2B7FD4",
          "blue-dark": "#1A5FA8",
          "blue-light": "#EBF4FF",
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 16px 0 rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
