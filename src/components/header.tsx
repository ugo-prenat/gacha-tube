import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/admin">Admin</HeaderLink>
      </nav>
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
