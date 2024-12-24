/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  darkMode: ['selector', 'html[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontWeight: {
      bold: '700',
      semibold: '600',
      normal: '400',
      light: '300',
    },
    backgroundColor: {
      'neutral-primary': 'var(--bg-neutral-primary)',
      'neutral-secondary': 'var(--bg-neutral-secondary)',
      'neutral-tertiary': 'var(--bg-neutral-tertiary)',
      'brand-primary': 'var(--bg-brand-primary)',
      'error-primary': 'var(--bg-error-primary)',
      'error-primary-hover': 'var(--bg-error-primary-hover)',
      'success-primary': 'var(--bg-success-primary)',
      'success-primary-hover': 'var(--bg-success-primary-hover)',
      'warning-primary': 'var(--bg-warning-primary)',
      'warning-primary-hover': 'var(--bg-warning-primary-hover)',
    },
    textColor: {
      'neutral-emphasis': 'var(--text-neutral-emphasis)',
      'neutral-primary': 'var(--text-neutral-primary)',
      'neutral-secondary': 'var(--text-neutral-secondary)',
      'neutral-tertiary': 'var(--text-neutral-tertiary)',
      'brand-primary': 'var(--text-brand-primary)',
      'error-primary': 'var(--text-error-primary)',
      'success-primary': 'var(--text-warning-primary)',
      'warning-primary': 'var(--text-success-primary)',
      'onbrand-primary': 'var(--text-onbrand-primary)',
      'onerror-primary': 'var(--text-onerror-primary)',
      'onsuccess-primary': 'var(--text-onsuccess-primary)',
      'onwarning-primary': 'var(--text-onwarning-primary)',
    },
    borderColor: {
      'neutral-primary': 'var(--border-neutral-primary)',
      'neutral-secondary': 'var(--border-neutral-secondary)',
      'neutral-tertiary': 'var(--border-neutral-tertiary)',
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        jetBrainsMono: ['var(--font-jetBrainsMono)'],
      },
    },
  },
  plugins: [typography],
} satisfies Config;
