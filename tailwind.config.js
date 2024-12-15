/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./**/*.{html,js,ts}","!./node_modules/**/*"],
  theme: {
    extend: {},
    height: {
        'header-sm': '85px',
        'header-lg': '104px',
    },
    colors: {
      primary: '#6F528A',
      secondary: '#B0F1C3',
      background: '#FFF7FE',
      cardColor: '#FFFFFF',
      darkGreen: '#00210F'
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      'Geist': ['Geist'],
      'kollektif': ['Kollektif']
    }
  },
  plugins: [],
}

