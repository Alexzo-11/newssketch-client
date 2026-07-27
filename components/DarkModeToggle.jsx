'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 text-charcoal dark:text-white"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}