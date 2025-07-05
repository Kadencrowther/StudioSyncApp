/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'boxdark': '#24303F',
        'strokedark': '#2E3A47',
        'meta-1': '#DC3545',
        'meta-2': '#EFF4FB',
        'meta-3': '#10B981',
        'meta-4': '#313D4A',
        'brand': {
          400: '#7592FF',
          500: '#465FFF'
        }
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '11.5': '2.875rem',
      },
      boxShadow: {
        'default': '0px 1px 3px 0px rgba(0, 0, 0, 0.08)',
        'dark-shadow': '0px 3px 6px 0px rgba(0, 0, 0, 0.4)'
      }
    }
  },
  plugins: [],
} 