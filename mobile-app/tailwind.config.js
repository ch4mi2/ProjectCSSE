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
        'primary-color': '#facc15',
        'custom-black': '#020617',
      },
    },
  },
  plugins: [],
};
