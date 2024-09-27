import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lavenderBlue: "#C4D7FF",
        blond: "#FFF4B5",
        sweet: "#FFD7C4",
        cornflowerBlue: "#87A2FF",
        darkCornflowerBlue: "#5A6B8C",
        lightSweet: "#FFF2DC",
      },
    },
  },
  plugins: [],
};
export default config;
