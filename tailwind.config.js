// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
    "./public/**/*.html",
    "./*.html"
  ],
  
  theme: {
    extend: {
      // Custom colors for AI/tech theme
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#7e95f8',
          500: '#667eea',  // Main primary color
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
        ai: {
          purple: '#667eea',
          darkPurple: '#764ba2',
          blue: '#2196f3',
          teal: '#00bcd4',
          green: '#4caf50',
          orange: '#ff9800',
          red: '#f44336',
          neural: '#9c27b0'
        },
        gradient: {
          start: '#667eea',
          end: '#764ba2'
        }
      },

      // Custom font families
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'display': ['Poppins', 'ui-sans-serif', 'system-ui']
      },

      // Custom spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },

      // Custom animations
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'neural-pulse': 'neuralPulse 4s ease-in-out infinite',
        'data-stream': 'dataStream 3s linear infinite',
      },

      // Keyframes for custom animations
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(102, 126, 234, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.8), 0 0 30px rgba(102, 126, 234, 0.6)' },
        },
        neuralPulse: {
          '0%, 100%': { 
            opacity: 1,
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: 0.7,
            transform: 'scale(1.05)'
          },
        },
        dataStream: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: 0
          },
          '50%': { 
            opacity: 1
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: 0
          },
        }
      },

      // Custom background images
      backgroundImage: {
        'neural-network': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C27B0\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/svg%3E')",
        'circuit-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23667eea\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"/%3E%3C/g%3E%3C/svg%3E')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // Custom box shadows
      boxShadow: {
        'ai': '0 10px 40px -10px rgba(102, 126, 234, 0.3)',
        'ai-lg': '0 20px 60px -15px rgba(102, 126, 234, 0.4)',
        'ai-xl': '0 25px 80px -20px rgba(102, 126, 234, 0.5)',
        'neural': '0 0 30px rgba(156, 39, 176, 0.3)',
        'glow-purple': '0 0 20px rgba(102, 126, 234, 0.5)',
      },

      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // Custom typography
      fontSize: {
        'xxs': ['0.625rem', '0.75rem'],
        '10xl': ['10rem', '1'],
      },

      // Custom z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Custom opacity
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '85': '0.85',
      },

      // Custom backdrop blur
      backdropBlur: {
        'xs': '2px',
      },

      // Gradient text support
      backgroundClip: {
        'text': 'text',
      },

      // Custom transition properties
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
      },

      // Custom scale
      scale: {
        '102': '1.02',
        '103': '1.03',
      }
    },
  },

  // Variants
  variants: {
    extend: {
      animation: ['hover', 'focus', 'group-hover'],
      transform: ['hover', 'focus'],
      scale: ['hover', 'active', 'group-hover'],
      opacity: ['disabled'],
      backgroundColor: ['active', 'disabled'],
      textColor: ['active', 'disabled'],
      borderColor: ['active', 'disabled'],
      boxShadow: ['hover', 'focus', 'active'],
      backdropBlur: ['hover', 'focus'],
    },
  },

  // Plugins
  plugins: [
    // Custom plugin for gradient text
    function({ addUtilities }) {
      const newUtilities = {
        '.gradient-text': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        },
        '.border-gradient': {
          'border-image': 'linear-gradient(135deg, #667eea, #764ba2) 1',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },

    // Custom plugin for glass morphism
    function({ addUtilities }) {
      const glassUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-purple': {
          background: 'rgba(102, 126, 234, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(102, 126, 234, 0.2)',
        },
      }
      addUtilities(glassUtilities, ['responsive', 'hover'])
    },

    // Custom plugin for neural network effects
    function({ addComponents }) {
      const components = {
        '.neural-node': {
          '@apply w-4 h-4 bg-ai-purple rounded-full shadow-neural animate-pulse-slow': {},
        },
        '.data-connection': {
          '@apply h-0.5 bg-gradient-to-r from-ai-purple to-ai-darkPurple animate-data-stream': {},
        },
        '.prediction-confidence': {
          '@apply h-2 bg-gray-200 rounded-full overflow-hidden': {},
          '&::after': {
            content: '""',
            display: 'block',
            height: '100%',
            'background': 'linear-gradient(90deg, #f44336, #ff9800, #4caf50)',
            'transition': 'width 0.5s ease-in-out',
          },
        },
      }
      addComponents(components)
    },

    // Custom forms plugin for better form styling
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),

    // Custom typography plugin
    require('@tailwindcss/typography'),

    // Custom aspect ratio plugin
    require('@tailwindcss/aspect-ratio'),
  ],

  // Core plugins configuration
  corePlugins: {
    // Ensure all core plugins are enabled
    preflight: true,
    container: false, // We'll use custom containers
  },

  // Important selector for overriding other styles
  important: false, // Set to true if you need to override other CSS frameworks

  // Dark mode configuration
  darkMode: 'class', // or 'media' for system preference

  // Future features (for Tailwind CSS v4 compatibility)
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: false,
    relativeContentPathsByDefault: false,
  },
}