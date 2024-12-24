'use client';

import { Moon, Sun } from 'lucide-react';

import { toggleTheme } from '../../utils/setTheme';

export function ThemeToggle() {
  return (
    <button onClick={toggleTheme}>
      <Moon className="hidden dark:block" />
      <Sun className="block dark:hidden" />
    </button>
  );
}
