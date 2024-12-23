/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontWeight: {
      bold: '700',
      semibold: '600',
      normal: '400',
      light: '300',
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        jetBrainsMono: ['var(--font-jetBrainsMono)'],
      },
      colors: {
        primaryBackground: 'var(--primaryBackground)',
        secondaryBackground: 'var(--secondaryBackground)',
        tertiaryBackground: 'var(--tertiaryBackground)',
        primaryText: 'var(--primaryText)',
        secondaryText: 'var(--secondaryText)',
        tertiaryText: 'var(--tertiaryText)',
        primaryBrand: 'var(--primaryBrand)',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
