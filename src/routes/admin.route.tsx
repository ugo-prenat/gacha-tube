import { createFileRoute } from '@tanstack/react-router';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { insertCard } from '@/features/cards/cards.fn';
import { cardsQueryOptions } from '@/features/cards/cards.queries';
import { groupCardsByCategory } from '@/features/cards/cards.utils';
import { RARITY_ORDER } from '@/features/cards/cards.type';
import { cn } from '@/utils/tailwind.utils';

export const Route = createFileRoute('/admin')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cardsQueryOptions),
  component: RouteComponent
});

const oauthUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?client_id=736393765480-d5h5rl1oeq64jedmnvtvrv4002mlelu4.apps.googleusercontent.com&redirect_uri=http://localhost:3000/admin&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly';

function RouteComponent() {
  const t = useTranslation();
  const queryClient = useQueryClient();
  const { data: cards } = useSuspenseQuery(cardsQueryOptions);
  const cardsByCategory = groupCardsByCategory(cards);

  const handleInsertCard = () =>
    insertCard()
      .then(() =>
        queryClient.invalidateQueries({ queryKey: cardsQueryOptions.queryKey })
      )
      .then(console.log);

  return (
    <div className="flex flex-col min-h-[calc(100svh-3.5rem)] p-6">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <Button onClick={handleInsertCard}>insert card</Button>
          <Button asChild>
            <a href={oauthUrl}>OAuth</a>
          </Button>
        </div>

        {Object.entries(cardsByCategory).map(([categoryId, categoryCards]) => (
          <section key={categoryId} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">
                {t(`youtube.category.${categoryId}`)}
              </h2>
              <span className="text-sm font-light text-muted-foreground">
                {categoryCards.length}
              </span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
              {categoryCards
                .sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity])
                .map((card) => (
                  <div
                    id={card.id}
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
                      <p className="text-sm text-muted-foreground">
                        {card.channel}
                      </p>
                      <p
                        className={cn('text-sm text-blue-300', {
                          'text-yellow-500': card.rarity === 'rare',
                          'text-purple-500': card.rarity === 'unique',
                          'text-red-500': card.rarity === 'collector'
                        })}
                      >
                        {t(`rarity.${card.rarity}`)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
