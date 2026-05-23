import { createServerFn } from '@tanstack/react-start';
import { Effect } from 'effect';
import {
  initialYoutubeAccessTokenRef,
  YoutubeAccessTokenRef,
  YoutubeService
} from './youtube.service';

export const getYoutubeVideos = createServerFn().handler(async () => {
  const program = Effect.gen(function* () {
    const youtubeService = yield* YoutubeService;
    const videos = yield* youtubeService.getVideos;
    return videos;
  });

  const runnable = program.pipe(
    Effect.provide(YoutubeService.Default),
    Effect.provideServiceEffect(
      YoutubeAccessTokenRef,
      initialYoutubeAccessTokenRef
    )
  );

  const result = await Effect.runPromise(runnable);
  console.log(result);
  return result;
});
