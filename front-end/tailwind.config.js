/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-color': '#003E29',
        'primary-dark-color': '#3FB377',
        'dark-flat': '#242526',
        'dark-ground': '#18191A',
        'dark-text': '#E4E6EB',
      },
      fontFamily: {
        OpenSans: ['"Open Sans"', 'sans-serif'],
      },
      keyframes: {
        slideRightIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideLeftOut: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(calc(100% + 32px))', opacity: 0 },
        },
        scaleIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideTopDown: {
          '0%': { transform: 'translateY(-100)', opacity: 0 },
          '100%': { transform: 'translateY(0%)', opacity: 1 },
        },
      },
      animation: {
        slideRightIn: 'slideRightIn 1s ease-in-out',
        scaleIn: 'scaleIn 0.2s linear',
        fadeOut: 'slideLeftOut 2s linear forwards',
        slideTopDown: 'slideTopDown 0.2s linear',
        toastAnimate: 'slideInLeft ease 1s',
      },
    },
  },
  plugins: [],
});
