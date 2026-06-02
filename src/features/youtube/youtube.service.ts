import { Context, Effect, Layer, Ref } from 'effect';
import {
  YOUTUBE_MAX_RESULTS_NB,
  YOUTUBE_REGION_CODE_FR
} from './youtube.constants';
import { youtubeInfinitePaginatedFetcher } from './youtube.fetcher';
import type { YoutubeVideo } from './youtube.types';
import { ConfigService } from '@/lib/config/config.service';

export class YoutubeAccessTokenRef extends Context.Tag('YoutubeAccessTokenRef')<
  YoutubeAccessTokenRef,
  Ref.Ref<string>
>() {
  static readonly Ref = Layer.effect(
    YoutubeAccessTokenRef,
    ConfigService.pipe(
      Effect.flatMap(({ YOUTUBE_ACCESS_TOKEN }) =>
        Ref.make(YOUTUBE_ACCESS_TOKEN)
      )
    )
  );
}

export class YoutubeService extends Effect.Service<YoutubeService>()(
  'YoutubeService',
  {
    accessors: true,
    effect: Effect.gen(function* () {
      return {
        getVideos: youtubeInfinitePaginatedFetcher<YoutubeVideo>('/videos', {
          chart: 'mostPopular',
          part: ['snippet', 'statistics'],
          regionCode: YOUTUBE_REGION_CODE_FR,
          maxResults: YOUTUBE_MAX_RESULTS_NB
        })
      };
    })
  }
) {}
