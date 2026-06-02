import { DbService } from '@/lib/db/db.service';
import { Effect } from 'effect';
import { cardsTable, type InsertCard } from './cards.schemas';

export class CardsService extends Effect.Service<CardsService>()(
  'CardsService',
  {
    accessors: true,
    effect: Effect.gen(function* () {
      const db = yield* DbService;

      return {
        listCards: () => db.select().from(cardsTable),
        insertCard: (cards: InsertCard[]) =>
          db
            .insert(cardsTable)
            .values(cards)
            .onConflictDoNothing()
            .returning({ youtubeId: cardsTable.youtubeId })
            .pipe(
              Effect.catchTags({
                EffectDrizzleQueryError: (e) =>
                  Effect.logError('Error inserting cards', e)
              })
            )
      };
    })
  }
) {}
