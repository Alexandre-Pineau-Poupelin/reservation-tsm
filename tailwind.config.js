/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fefcf7',
          100: '#fdf6e9',
          200: '#f8e8c8',
          300: '#f0d4a0',
          400: '#e0b870',
        },
        ocean: {
          50: '#eef5fb',
          100: '#d4e8f5',
          200: '#a8d0ea',
          600: '#1e5a8a',
          700: '#164572',
          800: '#0e3058',
          900: '#08203e',
        },
        coral: {
          400: '#f08878',
          500: '#e06855',
          600: '#c8503e',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
