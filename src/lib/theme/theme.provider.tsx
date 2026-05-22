import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren
} from 'react';
import { ScriptOnce } from '@tanstack/react-router';
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES } from './theme.types';

export type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const getThemeScript = () => {
  const key = JSON.stringify(THEME_STORAGE_KEY);
  const fallback = JSON.stringify(DEFAULT_THEME);

  return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;
};

const resolveTheme = (theme: Theme): Theme =>
  theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : theme;

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  const resolved = resolveTheme(theme);
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {}
});

const isTheme = (value: string | null): value is Theme =>
  value !== null && THEMES.includes(value as Theme);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    setThemeState(isTheme(stored) ? stored : DEFAULT_THEME);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme, mounted]);

  const setTheme = (next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setThemeState(next);
  };

  const toggleTheme = () =>
    setTheme(resolveTheme(theme) === 'dark' ? 'light' : 'dark');

  return (
    <ThemeProviderContext value={{ theme, setTheme, toggleTheme }}>
      <ScriptOnce>{getThemeScript()}</ScriptOnce>
      {children}
    </ThemeProviderContext>
  );
};

export const useTheme = () => useContext(ThemeProviderContext);
