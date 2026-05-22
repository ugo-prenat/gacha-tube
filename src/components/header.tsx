import { Link } from '@tanstack/react-router';

import { LangSelect } from '../lib/i18n/components/LangSelect';
import { ThemeToggle } from '../lib/theme/components/ThemeToggle';
import { useTranslation } from '@/lib/i18n';

export const Header = () => {
  const t = useTranslation();

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur flex justify-between items-center px-4">
      <nav className="flex h-14 items-center justify-center gap-2">
        <HeaderLink to="/">{t('home')}</HeaderLink>
        <HeaderLink to="/admin">{t('admin')}</HeaderLink>
      </nav>

      <div className="flex items-center gap-2">
        <LangSelect />
        <ThemeToggle />
      </div>
    </header>
  );
};

const HeaderLink = ({ to, ...props }: React.ComponentProps<typeof Link>) => (
  <Link
    to={to}
    activeProps={{ className: 'bg-accent text-accent-foreground' }}
    className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
    {...props}
  />
);
