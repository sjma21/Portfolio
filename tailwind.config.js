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
          950: '#020617',
          900: '#030712',
          800: '#060f1e',
          700: '#0a1628',
        },
      },
      boxShadow: {
        glow:
          '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(0,0,0,0.8), 0 0 80px rgba(16,185,129,0.12)',
        neon:
          '0 0 0 1px rgba(16,185,129,0.22), 0 0 40px rgba(16,185,129,0.14), 0 0 90px rgba(6,182,212,0.12)',
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
        txTicker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blockPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16,185,129,0.18)' },
          '50%': { boxShadow: '0 0 40px rgba(16,185,129,0.38)' },
        },
      },
      animation: {
        floaty: 'floaty 8s ease-in-out infinite',
        shimmer: 'shimmer 10s ease-in-out infinite alternate',
        cursor: 'cursor 1s step-end infinite',
        'tx-ticker': 'txTicker 38s linear infinite',
        'block-pulse': 'blockPulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

