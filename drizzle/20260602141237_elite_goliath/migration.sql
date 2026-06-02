CREATE TABLE IF NOT EXISTS "cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"channel" text NOT NULL,
	"like_nb" integer NOT NULL,
	"view_nb" integer NOT NULL,
	"thumbnail" text NOT NULL,
	"category_id" text NOT NULL,
	"youtube_id" text NOT NULL UNIQUE,
	"rarity" text NOT NULL,
	"published_at" timestamp NOT NULL
);
