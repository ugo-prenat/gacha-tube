import { createServerFn } from '@tanstack/react-start';
import { Effect } from 'effect';
import { CardsService } from './cards.service';
import { DbService, PgClientLive } from '@/lib/db/db.service';
import {
  YoutubeAccessTokenRef,
  YoutubeService
} from '../youtube/youtube.service';
import { youtubeVideosToCards } from './cards.utils';
import { ConfigService } from '@/lib/config/config.service';

export const insertCard = createServerFn().handler(async () => {
  const program = YoutubeService.getVideos.pipe(
    Effect.flatMap(youtubeVideosToCards),
    Effect.flatMap(CardsService.insertCard)
  );

  const runnable = program.pipe(
    Effect.provide(CardsService.Default),
    Effect.provide(DbService.Default),
    Effect.provide(PgClientLive),
    Effect.provide(YoutubeService.Default),
    Effect.provide(YoutubeAccessTokenRef.Ref),
    Effect.provide(ConfigService.Default)
  );

  return await Effect.runPromise(runnable);
});

export const listCards = createServerFn().handler(async () => {
  const program = CardsService.listCards();

  const runnable = program.pipe(
    Effect.provide(CardsService.Default),
    Effect.provide(DbService.Default),
    Effect.provide(PgClientLive)
  );

  return await Effect.runPromise(runnable);
});
