/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'form-bg-blue': '#4682B4'
      },
      fontSize: {
        '18': '18px',
        '20': '20px',
        '30': '30px',
        '35': '35px'
      },
      width: {
        'page': '80vw',
        'searchpage': '500px'
      },
      height: {
        'card': '480px'
      }
    },
    screens: {
      sm: {'min': '0px', 'max': '550px'},
      md: {'min': '550px', 'max': '840px'},
      lg: {'min': '840px', 'max': '1204px'},
      xl: {'min': '1204px', 'max': '1516px'},
      '2xl': {'min': '1536px'}
    },
  },
  plugins: [],
}