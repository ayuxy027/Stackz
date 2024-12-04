/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          light: '#FF6B9E',
          DEFAULT: '#FF3366',
          dark: '#CC0055'
        },
        secondary: {
          light: '#64FFDA',
          DEFAULT: '#4FD1C5',
          dark: '#3BA69A'
        },
        neon: {
          light: '#E6FF80',
          DEFAULT: '#CCFF00',
          dark: '#99CC00'
        },
        neutral: {
          light: '#F5F5F5',
          DEFAULT: '#D3D3D3',
          dark: '#333333'
        },
        background: {
          light: {
            primary: '#FAF5F0',
            secondary: '#F5E6D3',
            accent: '#FFF5E6'
          },
          dark: {
            primary: '#0A192F',
            secondary: '#112240',
            accent: '#1A2B4A'
          }
        },
        text: {
          light: {
            primary: '#333333',
            secondary: '#666666',
            muted: '#999999'
          },
          dark: {
            primary: '#E6E6E6',
            secondary: '#A0AEC0',
            muted: '#718096'
          }
        }
      },
      fontSize: {
        'xs-mobile': ['0.675rem', { lineHeight: '1rem' }],
        'sm-mobile': ['0.75rem', { lineHeight: '1.25rem' }],
        'base-mobile': ['0.875rem', { lineHeight: '1.5rem' }],
        'lg-mobile': ['1rem', { lineHeight: '1.75rem' }],
        'xl-mobile': ['1.25rem', { lineHeight: '2rem' }],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        'gradient-flow': {
          '0%': { 
            'background-position': '0% 50%',
            opacity: '0.7'
          },
          '50%': { 
            'background-position': '100% 50%',
            opacity: '1'
          },
          '100%': { 
            'background-position': '0% 50%',
            opacity: '0.7'
          }
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-left': 'slide-in-left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse': 'pulse-soft 1.5s infinite',
        'gradient-flow': 'gradient-flow 5s ease infinite',
      },
      backgroundImage: {
        'light-primary-gradient': 'linear-gradient(135deg, #FFF5E6 0%, #FAF5F0 100%)',
        'dark-primary-gradient': 'linear-gradient(135deg, #0A192F 0%, #112240 100%)',
        'light-ambient': 'linear-gradient(to bottom, #FAF5F0, #F5E6D3, #FFF5E6)',
        'dark-ambient': 'linear-gradient(to bottom, #0A192F, #112240, #1A2B4A)'
      },
      transitionProperty: {
        'colors-all': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform'
      },
      boxShadow: {
        'light-soft': '0 4px 6px -1px rgba(255, 179, 208, 0.1), 0 2px 4px -1px rgba(255, 107, 158, 0.06)',
        'dark-soft': '0 4px 6px -1px rgba(100, 255, 218, 0.1), 0 2px 4px -1px rgba(79, 209, 197, 0.06)',
        'btn-light': '0 2px 4px rgba(255, 107, 158, 0.2)',
        'btn-dark': '0 2px 4px rgba(100, 255, 218, 0.2)'
      }
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-primary': theme('colors.primary.DEFAULT'),
          '--color-secondary': theme('colors.secondary.DEFAULT'),
          '--color-background': theme('colors.background.light.primary'),
          '--color-text-primary': theme('colors.text.light.primary')
        },
        '.dark': {
          '--color-primary': theme('colors.primary.dark'),
          '--color-secondary': theme('colors.secondary.dark'),
          '--color-background': theme('colors.background.dark.primary'),
          '--color-text-primary': theme('colors.text.dark.primary')
        }
      })
    }
  ]
}