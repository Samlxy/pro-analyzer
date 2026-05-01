import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "rgb(5 150 105)", // emerald-600
          soft: "rgb(209 250 229)",  // emerald-100
        },
      },
      fontVariantNumeric: { tabular: "tabular-nums" },
    },
  },
  plugins: [],
};
export default config;
