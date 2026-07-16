/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Special Elite'", "monospace"],
        body: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      colors: {
        paper: {
          DEFAULT: "#FFFDF8",
          dim: "#EFE8D9",
          dark: "#1E2530",
          "dark-dim": "#191F28",
        },
        page: {
          light: "#F6F1E7",
          dark: "#161A22",
        },
        ink: {
          DEFAULT: "#2C271F",
          60: "#5B5346",
          50: "#786F5F",
          40: "#948A78",
          30: "#B7AC97",
          20: "#DCD3BF",
          10: "#E8E0CC",
          dark: "#EDE6D6",
        },
        seal: {
          light: "#B23A2E",
          dark: "#C9532C",
        },
      },
    },
  },
  plugins: [],
};
