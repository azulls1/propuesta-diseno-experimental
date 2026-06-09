/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand iagentek — deep teal/petrol (color icónico)
        brand: {
          50:  '#E6EAEC',
          100: '#C3CDD2',
          200: '#8A9FA8',
          300: '#506F7C',
          400: '#2B4753',
          500: '#04202C', // ← primario
          600: '#031A24',
          700: '#02141C',
          800: '#020F14',
          900: '#01080C',
        },
        // Sage / olive — neutrales del sistema iagentek
        sage: {
          50:  '#F7F8F7',
          100: '#EFF2F0',
          200: '#DFE4E0',
          300: '#C9D1C8',
          400: '#9EADA3',
          500: '#7D8F84',
          600: '#5B7065',
          700: '#4A5C50',
          800: '#304040',
          900: '#1F2A29',
        },
        // Forest accent (de rover)
        forest: {
          400: '#3D7A50',
          500: '#2E5A3C',
          600: '#234630',
        },
        // Semantic
        success: '#10b981',
        warning: '#f59e0b',
        danger:  '#dc2626',
        info:    '#1d4ed8',
      },
      fontFamily: {
        sans:    ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        ui:      ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card':       '0 1px 3px 0 rgba(4, 32, 44, 0.08), 0 1px 2px 0 rgba(4, 32, 44, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(4, 32, 44, 0.12), 0 4px 8px -2px rgba(4, 32, 44, 0.06)',
        'inset-soft': 'inset 0 0 0 1px rgba(4, 32, 44, 0.06)',
      },
      backgroundImage: {
        'gradient-brand':  'linear-gradient(135deg, #04202c, #5b7065)',
        'gradient-deep':   'linear-gradient(135deg, #04202c, #304040 40%, #021519)',
        'gradient-forest': 'linear-gradient(135deg, #2E5A3C, #04202C)',
      },
    },
  },
  plugins: [],
}
