/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Dark mode enable
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scrollBehavior: ['smooth'],
    },
  },
  plugins: [],
};
