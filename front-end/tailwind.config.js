/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#003E29',
      },
      fontFamily: {
        OpenSans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
