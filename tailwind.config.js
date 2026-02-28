/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#05060a',
          900: '#070914',
          800: '#0b0f22',
          700: '#12193a',
        },
      },
      boxShadow: {
        glow:
          '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(0,0,0,0.7), 0 0 80px rgba(168,85,247,0.14)',
        neon:
          '0 0 0 1px rgba(34,211,238,0.18), 0 0 40px rgba(34,211,238,0.12), 0 0 90px rgba(168,85,247,0.12)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        cursor: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        floaty: 'floaty 8s ease-in-out infinite',
        shimmer: 'shimmer 10s ease-in-out infinite alternate',
        cursor: 'cursor 1s step-end infinite',
      },
    },
  },
  plugins: [],
}

