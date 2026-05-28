import { createServerFn } from '@tanstack/react-start';
import { Effect } from 'effect';
import { youtubeVideosToCards } from '../cards/cards.utils';
import {
  YoutubeAccessTokenRef,
  YoutubeService,
  initialYoutubeAccessTokenRef
} from './youtube.service';

export const getYoutubeVideos = createServerFn().handler(async () => {
  const program = YoutubeService.getVideos.pipe(
    Effect.flatMap(youtubeVideosToCards),
    Effect.catchTags({
      YoutubeAPIError: () => {
        return Effect.fail('youtube api error');
      },
      YoutubeUnauthorizedError: () => {
        return Effect.fail('youtube unauthorized error');
      },
      YoutubeRefreshAccessTokenError: () => {
        return Effect.fail('youtube refresh access token error');
      }
    })
  );

  const runnable = program.pipe(
    Effect.provide(YoutubeService.Default),
    Effect.provideServiceEffect(
      YoutubeAccessTokenRef,
      initialYoutubeAccessTokenRef
    )
  );

  return await Effect.runPromise(runnable);
});
