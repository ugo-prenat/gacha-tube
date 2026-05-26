import { Context, Effect, Ref } from 'effect';
import type { YoutubeVideo } from './youtube.types';
import { youtubeFetcher } from './youtube.fetcher';
import {
  YOUTUBE_MAX_RESULTS_NB,
  YOUTUBE_REGION_CODE_FR
} from './youtube.constants';

export class YoutubeAccessTokenRef extends Context.Tag('YoutubeAccessTokenRef')<
  YoutubeAccessTokenRef,
  Ref.Ref<string>
>() {}

export const initialYoutubeAccessTokenRef = Ref.make(
  process.env.YOUTUBE_ACCESS_TOKEN!
);

export class YoutubeService extends Effect.Service<YoutubeService>()(
  'YoutubeService',
  {
    accessors: true,
    effect: Effect.gen(function* () {
      return {
        getVideos: youtubeFetcher<YoutubeVideo[]>('/videos', {
          chart: 'mostPopular',
          part: ['snippet', 'statistics'],
          regionCode: YOUTUBE_REGION_CODE_FR,
          maxResults: YOUTUBE_MAX_RESULTS_NB
        })
      };
    })
  }
) {}
