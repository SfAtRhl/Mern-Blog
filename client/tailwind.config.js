/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        lightPrimary: "#3490dc",
        lightSecondary: "#ffed4a",
        lightBackground: "#f0f0f0",

        // Dark Theme Colors
        darkPrimary: "#6b7280",
        darkSecondary: "#ffed4a",
        darkBackground: "#1a202c",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
