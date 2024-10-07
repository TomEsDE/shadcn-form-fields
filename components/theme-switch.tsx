'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitchV2() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);

    if (!theme || theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mq.matches ? 'dark' : 'light');
    }
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-flex items-center rounded-full border-2 border-muted-foreground/50 hover:border-primary hover:border-2">
        <button
          id="theme-switch"
          type="button"
          className={`relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
            theme === 'dark' ? 'bg-muted' : 'bg-muted'
          }`}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-[23px] w-[23px] -mt-0.5 bg-background transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out ${
              theme === 'dark' ? 'translate-x-[19px]' : '-translate-x-0.5'
            }`}
          >
            {theme === 'dark' ? (
              <Moon
                className="text-primary mt-[1.5px] ml-[2px]"
                height={20}
                width={20}
              />
            ) : (
              <Sun
                className="text-primary mt-[1.5px] ml-[1px]"
                height={20}
                width={20}
              />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
