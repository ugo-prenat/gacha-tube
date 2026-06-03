import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';

import '@/lib/i18n/i18n.config';
import { DEFAULT_LOCALE, LangProvider } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/lib/theme/theme.provider';
import { TooltipProvider } from '@/components/ui/tooltip';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { title: 'Gacha Tube' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    links: [{ rel: 'stylesheet', href: appCss }]
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <p>oula...</p>
    </main>
  ),
  shellComponent: RootDocument
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <LangProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Header />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </LangProvider>

        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
