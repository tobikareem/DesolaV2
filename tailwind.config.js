/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        grotesk: ["Space Grotesk", "serif"],
        work: ["Work Sans", "serif"],
      },
      spacing: {
        15: "60px",
        28: "112px",
      },
      colors: {
        primary: {
          100: "#D%E5FB",
          300: "#5C88DA",
          500: "#004AAD",
          600: "#003885",
          700: "#002F6C",
        },
        secondary: {
          100: "#FFE6CC",
          200: "#FFA366",
          500: "#FF6B00",
          600: "#CC5500",
          700: "#993F00",
        },
        neutral: {
          neutral: "#FAFAFA",
          100: "#FFFFFF",
          300: "#E3E3E3",
          500: "#666666",
          700: "#333333",
          900: "#121212",
        },
        success: "#28A745",
        error: "#DC3545",
        notification: "#17A2B8",
        warning: "#FFC107",
      },
      gradientColorStops: {
        linear: ["#FF9040", "#FF6B00"],
      },
    },
  },
  plugins: [],
};
