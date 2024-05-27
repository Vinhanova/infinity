/** @type {import('tailwindcss').Config} */
import { screens } from 'tailwindcss/defaultTheme'

export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')],
  theme: {
    screens: {
      xs: '450px',
      '3xl': '1625px',
      ...screens
    },
    extend: {
      colors: {
        custom: {
          tealblue: '#007991',
          'tealblue-hl': '#00aacc', //highlight
          jet: '#2A2B2E',
          'mid-jet': '#212225',
          'dark-jet': '#1d1e20'
        }
      }
    }
  }
}
