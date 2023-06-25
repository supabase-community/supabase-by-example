/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,pug}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["winter"],
  },
};
