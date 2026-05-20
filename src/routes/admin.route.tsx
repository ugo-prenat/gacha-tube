import { useTranslation } from '@/lib/i18n';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent
});

function RouteComponent() {
  const t = useTranslation();
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] p-6">{t('admin')}</div>
  );
}
