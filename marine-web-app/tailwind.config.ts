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
        ocean: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        marine: {
          dark: "#0a1628",
          deeper: "#1e3a5f",
          light: "#7dd3fc",
        },
        sand: "#f5e6d3",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Pretendard", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
      animation: {
        wave: "wave 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "gradient-ocean":
          "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0c4a6e 100%)",
        "gradient-hero":
          "linear-gradient(180deg, rgba(10, 22, 40, 0.8) 0%, rgba(30, 58, 95, 0.6) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
