import { Effect } from 'effect';
import {
  CARDS_COLLECTOR_MIN_VIEWS,
  CARDS_COMMON_MIN_VIEWS,
  CARDS_RARE_MIN_VIEWS,
  CARDS_UNIQUE_MIN_VIEWS
} from './cards.type';
import type { Rarity } from './cards.type';
import type { YoutubeVideo } from '../youtube/youtube.types';
import type { Card, InsertCard } from './cards.schemas';

export const groupCardsByCategory = (cards: Card[]) =>
  cards.reduce<Record<string, Card[]>>(
    (groups, card) => ({
      ...groups,
      [card.categoryId]: [...(groups[card.categoryId] || []), card]
    }),
    {}
  );

export const youtubeVideosToCards = (
  youtubeVideos: YoutubeVideo[]
): Effect.Effect<InsertCard[]> =>
  Effect.forEach(youtubeVideos, youtubeVideoToCard);

export const youtubeVideoToCard = ({
  id,
  snippet,
  statistics
}: YoutubeVideo): Effect.Effect<InsertCard> =>
  Effect.sync(() => ({
    youtubeId: id,
    name: snippet.title,
    channel: snippet.channelTitle,
    categoryId: snippet.categoryId,
    likeNb: Number(statistics.likeCount || 0),
    viewNb: Number(statistics.viewCount || 0),
    publishedAt: new Date(snippet.publishedAt),
    rarity: viewsToRarity(statistics.viewCount),
    thumbnail: snippet.thumbnails.high?.url || ''
  }));

const viewsToRarity = (viewCount: string): Rarity => {
  const views = Number(viewCount);

  if (views >= CARDS_COLLECTOR_MIN_VIEWS) return 'collector';
  if (views >= CARDS_UNIQUE_MIN_VIEWS) return 'unique';
  if (views >= CARDS_RARE_MIN_VIEWS) return 'rare';
  if (views >= CARDS_COMMON_MIN_VIEWS) return 'common';
  return 'common';
};
