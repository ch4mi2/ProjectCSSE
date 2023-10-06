/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './components/**/**/*.{js,jsx,ts,tsx}',
    './screens/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0369A1',
        'light-blue': '#0284C7',
        'lightest-blue': '#F0F9FF',
      },
    },
  },
  plugins: [],
};
