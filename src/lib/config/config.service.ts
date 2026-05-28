import { Config, Effect } from 'effect';

export class ConfigService extends Effect.Service<ConfigService>()(
  'ConfigService',
  {
    effect: Config.all({
      YOUTUBE_CLIENT_ID: Config.string('YOUTUBE_CLIENT_ID'),
      YOUTUBE_ACCESS_TOKEN: Config.string('YOUTUBE_ACCESS_TOKEN'),
      YOUTUBE_CLIENT_SECRET: Config.string('YOUTUBE_CLIENT_SECRET'),
      YOUTUBE_REFRESH_TOKEN: Config.string('YOUTUBE_REFRESH_TOKEN')
    })
  }
) {}
