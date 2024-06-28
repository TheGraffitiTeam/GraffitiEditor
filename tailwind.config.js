/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        eraser: "url(/eraser.svg), auto",
      },
    },
  },
  plugins: [],
};
