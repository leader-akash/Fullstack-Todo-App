/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBackground: 'var(--color-light-background)',
        darkBackground: 'var(--color-dark-background)',
        lightText: 'var(--color-light-text)',
        darkText: 'var(--color-dark-text)',
      },
    },
  },
  plugins: [],
};
