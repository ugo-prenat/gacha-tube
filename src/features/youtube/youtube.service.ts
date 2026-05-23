import { Context, Effect, Ref } from 'effect';
import type { YoutubeVideo } from './youtube.types';

export class YoutubeAccessTokenRef extends Context.Tag('YoutubeAccessTokenRef')<
  YoutubeAccessTokenRef,
  Ref.Ref<string>
>() {}

export const initialYoutubeAccessTokenRef = Ref.make('');

export class YoutubeService extends Effect.Service<YoutubeService>()(
  'YoutubeService',
  {
    accessors: true,
    effect: Effect.gen(function* () {
      return {
        getVideos: Effect.gen(function* () {
          const videos: YoutubeVideo[] = [
            {
              id: 'id',
              etag: 'etag',
              kind: 'youtube#video',
              snippet: {},
              statistics: {}
            } as YoutubeVideo
          ];

          const accessTokenRef = yield* YoutubeAccessTokenRef;
          const accessToken = yield* Ref.get(accessTokenRef);
          Effect.log('fetching youtube API with', { accessToken });

          return yield* Effect.succeed(videos);
          // return yield* youtubeFetcher<YoutubeVideo[]>('/videos');
        })
      };
    })
  }
) {}
