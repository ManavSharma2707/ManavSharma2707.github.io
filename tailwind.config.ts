import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { base: "#0B0C0E", panel: "#12151A", panelAlt: "#171B21" },
        "bg-light": { base: "#F4F3EF", panel: "#FFFFFF", panelAlt: "#F0EFEC" },
        frame: { crimson: "#8E1020", crimsonDeep: "#5A0A14", silver: "#C7CBD1", silverDeep: "#9AA0A8" },
        gold: { DEFAULT: "#C9A54A", light: "#E8CD7E" },
        data: { cyan: "#35D6E8", teal: "#1C7E88", "cyan-light": "#0E7C86", "teal-light": "#0B6169" },
        ink: { primary: "#E6E8EB", muted: "#8B929C", "primary-light": "#1B1D21", "muted-light": "#5B6169" },
        line: { subtle: "#2A2F37", "subtle-light": "#D8D6D0" },
      },
      fontFamily: {
        display: ["Rajdhani", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        grid: "8px",
      },
    },
  },
  plugins: [],
} satisfies Config;
