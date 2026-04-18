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
          DEFAULT: '#61F3FF',
          500: '#8AF6FF',
          600: '#2FE7F8',
          700: '#10C9DE',
        },
        signal: {
          DEFAULT: '#CBFF47',
          500: '#D9FF7E',
          600: '#B8F11F',
          700: '#98CC10',
        },
        surface: {
          warm: '#EAF1F8',
          veil: '#F7FBFF',
        },
        deep: {
          slate: '#08101D',
          ink: '#0D1628',
          void: '#030711',
        },
        mist: {
          DEFAULT: '#9CB7D8',
          100: '#E8F2FF',
          200: '#C6D9F0',
          300: '#A8C0DE',
        },
        pearl: {
          DEFAULT: '#EEF4FB',
          200: '#DBE5F0',
          300: '#C2D0DF',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 18px 60px rgba(4, 10, 24, 0.12)',
        panel: '0 24px 80px rgba(2, 8, 20, 0.24)',
        glow: '0 0 0 1px rgba(97, 243, 255, 0.16), 0 20px 80px rgba(97, 243, 255, 0.18)',
      },
      fontFamily: {
        heading: ['"Segoe UI Variable Display"', '"Bahnschrift"', '"PingFang SC"', '"Microsoft YaHei"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"Cascadia Code"', '"JetBrains Mono"', '"IBM Plex Mono"', 'ui-monospace', '"SFMono-Regular"', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        luxe: '0.18em',
      },
      backgroundImage: {
        'aurora-grid':
          'radial-gradient(circle at top, rgba(143, 169, 255, 0.22), transparent 32%), radial-gradient(circle at 20% 20%, rgba(216, 255, 99, 0.14), transparent 18%)',
      },
    },
  },
  plugins: [],
};
