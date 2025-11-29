/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'trebuchet': ['Trebuchet MS', 'sans-serif'],
      },
    },
  },
  plugins: [],
}