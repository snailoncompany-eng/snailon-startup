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
        cream: "#F0EAE0",
        dark: "#191916",
        "dark-card": "#232318",
        "dark-elev": "#2A2A1F",
        "text-dark": "#1C1B17",
        "text-light": "#F0EAE0",
        accent: "#C4622A",
        "accent-soft": "#E89568",
        "muted-light": "#6B6558",
        "muted-dark": "#8A8574",
        "border-light": "#D9D3C8",
        "border-dark": "#2E2E28",
        success: "#3D6B45",
        warning: "#B8822A",
        danger: "#8B3030",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Times New Roman", "serif"],
        sans: ["DM Sans", "-apple-system", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
