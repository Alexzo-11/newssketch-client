/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: '#3C4043',
        lightSlate: '#BCC0C4',
        deepCrimson: '#C5232A',
        softLightGray: '#E8EAED',
        white: '#FFFFFF',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};