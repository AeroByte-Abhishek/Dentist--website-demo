/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        noir: '#0A0A0A',
        charcoal: '#1A1A1A',
        gold: '#D4AF37',
        royal: '#6B46C1',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(212, 175, 55, 0.3)',
        card: '0 14px 50px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        luxe: 'linear-gradient(140deg, rgba(212,175,55,0.15), rgba(107,70,193,0.1))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
