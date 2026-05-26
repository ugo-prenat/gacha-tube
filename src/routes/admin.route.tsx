import { Button } from '@/components/ui/button';
import { getYoutubeVideos } from '@/features/youtube/youtube.fn';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent
});

const oauthUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?client_id=736393765480-d5h5rl1oeq64jedmnvtvrv4002mlelu4.apps.googleusercontent.com&redirect_uri=http://localhost:3000/admin&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly';

function RouteComponent() {
  const handleGetYoutubeVideos = () => getYoutubeVideos().then(console.log);

  return (
    <div className="flex flex-col min-h-[calc(100svh-3.5rem)] p-6">
      <div className="flex justify-between gap-2">
        <Button asChild>
          <a href={oauthUrl}>OAuth</a>
        </Button>

        <Button onClick={handleGetYoutubeVideos}>Get Videos</Button>
      </div>
    </div>
  );
}
