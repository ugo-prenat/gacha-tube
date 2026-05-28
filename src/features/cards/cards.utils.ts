import { Effect } from 'effect';
import type { YoutubeVideo } from '../youtube/youtube.types';
import type { Card } from './cards.type';

export const youtubeVideosToCards = (
  youtubeVideos: YoutubeVideo[]
): Effect.Effect<Card[]> => Effect.forEach(youtubeVideos, youtubeVideoToCard);

export const youtubeVideoToCard = ({
  id,
  snippet
}: YoutubeVideo): Effect.Effect<Card> =>
  Effect.sync(() => ({
    id,
    youtubeId: id,
    rarity: 'common',
    name: snippet.title,
    channel: snippet.channelTitle,
    thumbnail: snippet.thumbnails?.high?.url || ''
  }));
