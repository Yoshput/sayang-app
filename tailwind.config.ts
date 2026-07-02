import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF6FA",
          100: "#FFE9F3",
          200: "#FFD1E8",
          300: "#FCAFD6",
          400: "#F98FC2",
          500: "#F472B6",
        },
        lilac: {
          50: "#FAF6FF",
          100: "#F1E7FE",
          200: "#E3CFFD",
          300: "#CBAAFB",
          400: "#B58AF5",
          500: "#9C6BEA",
        },
        mint: {
          50: "#F1FBF6",
          100: "#DFF6E9",
          200: "#BEEBD2",
          300: "#94DCB6",
          400: "#68C89A",
          500: "#45B283",
        },
        cream: {
          50: "#FFFDF8",
          100: "#FFF8ED",
          200: "#FCEFD8",
        },
      },
      fontFamily: {
        display: ["var(--font-quicksand)"],
        sans: ["var(--font-poppins)"],
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(244, 114, 182, 0.25)",
        softer: "0 4px 20px -6px rgba(156, 107, 234, 0.2)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 1.2s ease-in-out infinite",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
