/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Open Sans Variable", "sans-serif"],
      display: ["fredoka", "system-ui"],
      monaco: ["monaco", "sans-serif"], // Add your custom font here
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      subsm: { max: "520px" },
      xs: { max: "480px" },
    },
    extend: {},
  },
  plugins: [],
};
