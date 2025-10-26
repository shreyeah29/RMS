'use client';

import { useSession } from 'next-auth/react';
import { Bell, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-slate-900">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">
          Welcome back, {session?.user?.name}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        <button className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {session?.user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

