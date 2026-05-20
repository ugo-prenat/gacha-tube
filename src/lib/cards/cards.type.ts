export const CARDS_COMMON_MIN_VIEWS = 0;
export const CARDS_RARE_MIN_VIEWS = 10000; // 10k views
export const CARDS_UNIQUE_MIN_VIEWS = 1000000; // 1M views
export const CARDS_COLLECTOR_MIN_VIEWS = 10000000; // 10M views

export type Card = {
  id: string;
  name: string;
  rarity: Rarity;
  channel: string;
  thumbnail: string;
  youtubeId: string;
};

export type Rarity = 'common' | 'rare' | 'unique' | 'collector';
