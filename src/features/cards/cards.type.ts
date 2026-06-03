export const CARDS_COMMON_MIN_VIEWS = 0;
export const CARDS_RARE_MIN_VIEWS = 100000; // 100k views
export const CARDS_UNIQUE_MIN_VIEWS = 1000000; // 1M views
export const CARDS_COLLECTOR_MIN_VIEWS = 10000000; // 10M views

export type Rarity = 'common' | 'rare' | 'unique' | 'collector';

export const RARITY_ORDER: Record<Rarity, number> = {
  common: 0,
  rare: 1,
  unique: 2,
  collector: 3
};
