import { getYoutubeVideos } from '@/features/youtube/youtube.fn';
import { useTranslation } from '@/lib/i18n';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  loader: () => getYoutubeVideos()
});

function RouteComponent() {
  const t = useTranslation();
  const data = useLoaderData({ from: Route.id });

  return (
    <div className="flex flex-col min-h-[calc(100svh-3.5rem)] p-6">
      {t('admin')}

      <pre className="mt-10">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
