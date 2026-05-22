import { Moon, Sun } from 'lucide-react';
import { useHotkey } from '@tanstack/react-hotkeys';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useTheme } from '../theme.provider';

export const ThemeToggle = () => {
  const t = useTranslation();
  const { toggleTheme } = useTheme();

  useHotkey('T', (e) => {
    e.preventDefault();
    toggleTheme();
  });

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={toggleTheme}
      className="relative bg-input/20 dark:bg-input/30 dark:hover:bg-input/50 border-ring/45"
    >
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">{t('theme.toggle')}</span>
    </Button>
  );
};
