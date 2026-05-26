import { createServerFn } from '@tanstack/react-start';
import { Effect } from 'effect';
import {
  initialYoutubeAccessTokenRef,
  YoutubeAccessTokenRef,
  YoutubeService
} from './youtube.service';

export const getYoutubeVideos = createServerFn().handler(async () => {
  const program = YoutubeService.getVideos.pipe(
    Effect.catchTags({
      YoutubeAPIError: (error) => {
        console.error(error);
        return Effect.succeed(['youtube api error']);
      },
      YoutubeRefreshAccessTokenError: (error) => {
        console.error(error);
        return Effect.succeed(['youtube refresh access token error']);
      },
      YoutubeUnauthorizedError: (error) => {
        console.error(error);
        return Effect.succeed(['youtube unauthorized error']);
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
