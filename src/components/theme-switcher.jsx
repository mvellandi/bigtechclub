import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

const modes = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor }
];

function savedMode() {
  try {
    const value = localStorage.getItem('bigtechclub-theme');
    return modes.some((mode) => mode.value === value) ? value : 'system';
  } catch {
    return 'system';
  }
}

export function ThemeSwitcher() {
  const [mode, setMode] = useState(savedMode);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      document.documentElement.dataset.theme = mode === 'dark' || (mode === 'system' && preference.matches) ? 'dark' : 'light';
      document.documentElement.dataset.themeMode = mode;
    };
    apply();
    preference.addEventListener('change', apply);
    try {
      localStorage.setItem('bigtechclub-theme', mode);
    } catch {
      return () => preference.removeEventListener('change', apply);
    }
    return () => preference.removeEventListener('change', apply);
  }, [mode]);

  return (
    <div className="theme-switcher" role="group" aria-label="Color mode">
      {modes.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={`${label} color mode`}
          aria-pressed={mode === value}
          title={label}
          onClick={() => setMode(value)}
        >
          <Icon aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
