import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import { Header } from '../components/header';
import appCss from '../styles.css?url';

import '@/lib/i18n/i18n.config';
import { DEFAULT_LOCALE } from '@/lib/i18n';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { title: 'YouTube Gacha' },
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
    <html lang={DEFAULT_LOCALE}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
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
