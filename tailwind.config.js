/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f172a", // slate-900
        card: "#020617", // slate-950
        accent: "#38bdf8", // sky-400
      },
    },
  },
  plugins: [],
};
