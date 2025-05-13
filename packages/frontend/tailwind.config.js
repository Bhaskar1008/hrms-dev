/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F52BA',
          dark: '#0A3C84',
          light: '#E6F0FF'
        },
        secondary: {
          DEFAULT: '#20B2AA',
          dark: '#178F89',
          light: '#E6F7F6'
        },
        accent: {
          DEFAULT: '#6A5ACD',
          dark: '#5849B0',
          light: '#EEEAF9'
        },
        success: {
          DEFAULT: '#10B981',
          dark: '#0B9669',
          light: '#ECFDF5'
        },
        warning: {
          DEFAULT: '#FFC107',
          dark: '#D6A206',
          light: '#FFFBEB'
        },
        error: {
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
          light: '#FEF2F2'
        }
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};