/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    fill: ["hover"],
  },
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  variants: { borderStyle: ["responsive"] },
  plugins: [require("@tailwindcss/aspect-ratio")],
  theme: {
    colors: {
      transparent: "transparent",
      slate: {
        25: "#f3f5f840",
        50: "#f2f2f2",
        100: "#ffffff",
        200: "#e2e2f6",
        300: "#c5c5d9",
        400: "#a9a9bd",
        500: "#82828c",
        600: "#65656f",
        700: "#484852",
        800: "#1d1d34",
        900: "#111118",
      },
      harlequin: {
        50: "#e6f7e6",
        100: "#edf5ed",
        200: "#00fc77",
        300: "#2bd81d",
        400: "#35d00d",
        500: "#41B883",
        900: "#0f1b0e",
      },
      green: {
        100: "#caf8c5",
        200: "#00fc77",
        300: "#0dd400",
        400: "#13c300",
      },
      red: {
        100: "#ffe0e0",
        500: "#ff0101",
        900: "#610101",
      },
      orange: {
        50: "#ff8225",
      },
    },
    extend: {
      rotate: {
        neg180: "-180deg",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      rotate: {
        m180: "-180deg",
      },
    },
  },
};
