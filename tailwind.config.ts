import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:        "var(--cream)",
        dark:         "var(--dark)",
        "dark-card":  "var(--dark-card)",
        "text-dark":  "var(--text-dark)",
        "text-light": "var(--text-light)",
        accent:       "var(--accent)",
        "muted-light":"var(--muted-light)",
        "muted-dark": "var(--muted-dark)",
        "border-light":"var(--border-light)",
        "border-dark": "var(--border-dark)",
        success:      "var(--success)",
        warning:      "var(--warning)",
        danger:       "var(--danger)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "var(--page-max)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
        deep: "var(--shadow-deep)",
      },
    },
  },
  plugins: [],
};

export default config;
