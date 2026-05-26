import { Schema } from 'effect';

export class YoutubeAPIError extends Schema.TaggedError<YoutubeAPIError>()(
  'YoutubeAPIError',
  {
    error: Schema.Defect,
    endpoint: Schema.String,
    statusCode: Schema.Number
  }
) {}

export class YoutubeRefreshAccessTokenError extends Schema.TaggedError<YoutubeRefreshAccessTokenError>()(
  'YoutubeRefreshAccessTokenError',
  {
    error: Schema.Defect
  }
) {}

export class YoutubeUnauthorizedError extends Schema.TaggedError<YoutubeUnauthorizedError>()(
  'YoutubeUnauthorizedError',
  {
    error: Schema.Defect
  }
) {}
