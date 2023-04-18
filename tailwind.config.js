import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          ...defaultTheme.fontFamily.sans,
          {
            fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
          },
        ],
      },
      colors: {
        dark: {
          50: '#C1C2C5',
          100: '#A6A7AB',
          200: '#909296',
          300: '#5c5f66',
          400: '#373A40',
          500: '#2C2E33',
          600: '#25262b',
          700: '#1A1B1E',
          800: '#141517',
          900: '#101113',
        },
      },
      lineClamp: {
        7: '7',
      },
    },
  },
  plugins: [],
}

