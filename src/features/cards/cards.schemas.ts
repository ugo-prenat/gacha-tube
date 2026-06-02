import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import type { Rarity } from '@/features/cards/cards.type';
import { uuid } from 'drizzle-orm/pg-core';

export const cardsTable = pgTable('cards', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  channel: text('channel').notNull(),
  likeNb: integer('like_nb').notNull(),
  viewNb: integer('view_nb').notNull(),
  thumbnail: text('thumbnail').notNull(),
  categoryId: text('category_id').notNull(),
  youtubeId: text('youtube_id').notNull().unique(),
  rarity: text('rarity').$type<Rarity>().notNull(),
  publishedAt: timestamp('published_at').notNull()
});

export type Card = typeof cardsTable.$inferSelect;
export type InsertCard = typeof cardsTable.$inferInsert;
