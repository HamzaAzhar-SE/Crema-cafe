/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F7F1E8',
          50: '#FCF9F4',
          100: '#F7F1E8',
          200: '#EFE4D4',
          300: '#E3D3BC',
        },
        espresso: {
          DEFAULT: '#3B2A20',
          300: '#7A6152',
          400: '#5C4436',
          500: '#3B2A20',
          600: '#2E2019',
          700: '#241913',
          800: '#1B120E',
          900: '#120C09',
        },
        caramel: {
          DEFAULT: '#C68B59',
          300: '#DBA876',
          400: '#CF9866',
          500: '#C68B59',
          600: '#A96F40',
          700: '#8A5932',
        },
        sage: {
          DEFAULT: '#7A8B69',
          300: '#9DAB8E',
          400: '#8B9A7A',
          500: '#7A8B69',
          600: '#63714F',
          700: '#4E5A3E',
        },
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-raised': 'rgb(var(--surface-raised) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--ink-muted) / <alpha-value>)',
        'ink-subtle': 'rgb(var(--ink-subtle) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(59 42 32 / 0.08), 0 12px 32px -12px rgb(59 42 32 / 0.14)',
        'soft-lg': '0 4px 12px -4px rgb(59 42 32 / 0.10), 0 24px 56px -20px rgb(59 42 32 / 0.22)',
        glow: '0 0 0 1px rgb(198 139 89 / 0.35), 0 16px 40px -16px rgb(198 139 89 / 0.45)',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      },
      maxWidth: {
        shell: '84rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        'steam-rise': {
          '0%': { opacity: '0', transform: 'translateY(6px) scaleX(0.9)' },
          '40%': { opacity: '0.9' },
          '100%': { opacity: '0', transform: 'translateY(-22px) scaleX(1.4)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'steam-rise': 'steam-rise 2.4s ease-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
