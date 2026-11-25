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
        // Primary brand blue (buttons, links, section headings)
        primary: {
          50: "#F0F7FE",
          100: "#DCEBF8",
          200: "#B9D7F1",
          300: "#8BBCE6",
          400: "#4F98D6",
          500: "#2B85C8",
          600: "#1C75BC",
          700: "#05458D",
          800: "#043A77",
          900: "#032C5A",
        },
        navy: { DEFAULT: "#232F3E", 900: "#131A22" },
        price: "#E52329",
        deal: "#EFF522",
        ink: "#202630",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 8px rgba(0,0,0,0.05)",
        cardHover: "0 10px 30px rgba(5,69,141,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
