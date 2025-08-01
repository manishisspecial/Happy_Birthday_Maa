/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        peach: {
          50: '#fef7f0',
          100: '#fdecd4',
          200: '#fbd5a8',
          300: '#f8b871',
          400: '#f5933a',
          500: '#f2751a',
          600: '#e35a0f',
          700: '#bc4310',
          800: '#953514',
          900: '#782e14',
        },
        pastel: {
          blue: '#e0f2fe',
          pink: '#fce7f3',
          yellow: '#fefce8',
          green: '#f0fdf4',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
} 