/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {}
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')],
  theme: {
    screens: {
      xs: '450px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        custom: {
          tealblue: '#007991',
          'tealblue-hl': '#00aacc', //highlight
          jet: '#2A2B2E'
        }
      }
    }
  }
}
