import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { InsertCard } from '@/features/cards/cards.schemas';
import { useTranslation } from '@/lib/i18n';
import { insertCard, listCards } from '@/features/cards/cards.fn';

export const Route = createFileRoute('/admin')({
  component: RouteComponent
});

const oauthUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?client_id=736393765480-d5h5rl1oeq64jedmnvtvrv4002mlelu4.apps.googleusercontent.com&redirect_uri=http://localhost:3000/admin&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly';

function RouteComponent() {
  const t = useTranslation();
  const [cards, setCards] = useState<InsertCard[]>([]);

  const handleInsertCard = () => insertCard().then(console.log);
  const handleListCards = () => listCards().then(setCards);

  return (
    <div className="flex flex-col min-h-[calc(100svh-3.5rem)] p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Button onClick={handleInsertCard}>insert card</Button>
          <Button onClick={handleListCards}>list cards</Button>
          <Button asChild>
            <a href={oauthUrl}>OAuth</a>
          </Button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col bg-card rounded-md p-4 gap-4"
            >
              <a
                target="_blank"
                href={`https://www.youtube.com/watch?v=${card.youtubeId}`}
              >
                <img src={card.thumbnail} alt={card.name} />
              </a>
              <div>
                <p className="font-medium">{card.name}</p>
                <p className="text-sm text-muted-foreground">{card.channel}</p>
                <p className="text-sm text-muted-foreground">
                  {t(`youtube.category.${card.categoryId}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
