import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          dark: '#C2570A',
          light: '#FFEDD9',
        },
        secondary: '#0A0A0A',
        surface: '#FFFFFF',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
      },
      boxShadow: {
        'soft-sm': '0 1px 2px rgba(10,10,10,0.05)',
        'soft-md': '0 4px 12px rgba(10,10,10,0.08)',
        'soft-lg': '0 12px 24px rgba(10,10,10,0.12)',
      },
      transitionDuration: {
        hover: '250ms',
        scroll: '500ms',
      },
    },
  },
  plugins: [],
};

export default config;
