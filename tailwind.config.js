/** @type {import('tailwindcss').Config} */
const { colors: defaultColors } = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter, sans-serif",
      },
      colors: {
        darkBlue: "#000853",
        mainPink: "#F0EAF8",
        pink: "#CBB6E5",
        purple: "#761BE4",
        red: "#ED4545",
        lightRed: "#FEECEC",
        gray: "#898DA9",
      },
    },
  },
  plugins: [],
};
