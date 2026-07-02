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
        magenta: {
          50: "#FFF0FF",
          100: "#FFE0FF",
          200: "#FFC0FF",
          300: "#FF90FF",
          400: "#E040E0",
          500: "#C020C0",
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
        peach: {
          50: "#FFF7F0",
          100: "#FFEEDD",
          200: "#FFDCBB",
          300: "#FFC299",
          400: "#FFA877",
          500: "#FF8E55",
        },
      },
      fontFamily: {
        display: ["var(--font-quicksand)"],
        sans: ["var(--font-poppins)"],
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(244, 114, 182, 0.25)",
        softer: "0 4px 20px -6px rgba(156, 107, 234, 0.2)",
        glow: "0 0 24px rgba(249, 143, 194, 0.45)",
        "glow-lilac": "0 0 24px rgba(181, 138, 245, 0.40)",
        "glow-magenta": "0 0 24px rgba(224, 64, 224, 0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "pastel-gradient": "linear-gradient(135deg, #FFF2F9 0%, #F6EEFF 50%, #EBF9F1 100%)",
        "blush-gradient": "linear-gradient(135deg, #FFD1E8 0%, #F98FC2 100%)",
        "lilac-gradient": "linear-gradient(135deg, #E3CFFD 0%, #B58AF5 100%)",
        "couple-gradient": "linear-gradient(135deg, #FFF2F9 0%, #F6EEFF 50%, #EBF9F1 100%)",
        "single-gradient": "linear-gradient(135deg, #FFF7F0 0%, #FFF0FF 50%, #F6EEFF 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
