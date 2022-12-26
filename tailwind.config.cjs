/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  theme: {
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
