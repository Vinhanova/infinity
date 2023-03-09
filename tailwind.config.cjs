/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  theme: {
    screens: {
      xs: '450px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        custom: {
          tealblue: '#007991',
          jet: '#2A2B2E'
        }
      }
    }
  }
}
