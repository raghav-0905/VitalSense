/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          50: '#f5f1f8',
          100: '#ece4f1',
          200: '#ddd1e5',
          300: '#c3b0d0',
          400: '#a48cb8',
          500: '#81668f',
          600: '#634d72',
          700: '#4a3557',
          800: '#3b2946',
          900: '#2f2038',
          950: '#1f1427',
        },
        primary: '#4a3557',
        secondary: '#efe5d8',
        accent: '#6d6179',
        darkbg: '#2b2234'
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
