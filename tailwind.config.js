/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{html,jsx}", "./src/**/*.{html,jsx}", "./index.html",],
  theme: {
    extend: {
      colors: {
        "blue": "#489471",
        "black": "#1a1a1a",
        "white": "#ffffff",
        "gold": "#C8B568",
        "green": "#bcd4d4",
      }
    },
  },
  plugins: [],
}

