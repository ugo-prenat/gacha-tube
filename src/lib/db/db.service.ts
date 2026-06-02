import { PgClient } from '@effect/sql-pg';
import * as PgDrizzle from 'drizzle-orm/effect-postgres';
import { Effect, Layer, Redacted } from 'effect';
import { ConfigService } from '@/lib/config/config.service';

export const PgClientLive = Effect.gen(function* () {
  const config = yield* ConfigService;

  return PgClient.layer({ url: Redacted.make(config.DATABASE_URL) });
}).pipe(Layer.unwrapEffect, Layer.provide(ConfigService.Default));

export class DbService extends Effect.Service<DbService>()('DbService', {
  accessors: true,
  effect: PgDrizzle.makeWithDefaults()
}) {}
