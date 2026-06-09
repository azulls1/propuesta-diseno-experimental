/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Scientific lab palette — slate base + cyan accents
        brand: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // primary
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        ink: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a', // background dark
          950: '#020617', // background darkest
        },
        accent: {
          warn:    '#f59e0b',
          danger:  '#ef4444',
          success: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 24px -4px rgba(6, 182, 212, 0.35)',
        'card': '0 4px 24px -4px rgba(2, 6, 23, 0.6)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6,182,212,0.12), transparent)',
      },
    },
  },
  plugins: [],
}
