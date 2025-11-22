/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#9CA387',
          600: '#8B9278',
          700: '#7C846A',
        },
        surface: {
          warm: '#FAFAF7',
        },
        deep: {
          slate: '#1E252C',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        heading: ['DM Serif Display', 'ui-serif', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
