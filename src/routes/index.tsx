import { useTranslation } from '@/lib/i18n';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const t = useTranslation();
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] p-6">{t('home')}</div>
  );
}
