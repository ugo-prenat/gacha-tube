import { Effect, Ref } from 'effect';
import { YOUTUBE_REFRESH_TOKEN_URL } from './youtube.constants';
import {
  YoutubeAPIError,
  YoutubeRefreshAccessTokenError,
  YoutubeUnauthorizedError
} from './youtube.errors';
import { YoutubeAccessTokenRef } from './youtube.service';
import { buildYoutubeUrl } from './youtube.utils';
import type {
  PaginatedYoutubeResponse,
  YoutubeQueryParams,
  YoutubeRefreshTokenResponse
} from './youtube.types';
import { ConfigService } from '@/lib/config/config.service';

type Method = 'GET' | 'POST';

type Input = string | { method: Method; url: string; body?: object };

export const youtubeFetcher = <T>(
  input: Input,
  queryParams?: YoutubeQueryParams
) =>
  performFetch<T>(input, queryParams).pipe(
    Effect.catchTag('YoutubeUnauthorizedError', () =>
      Effect.gen(function* () {
        yield* Effect.log(
          'Received 401 Unauthorized, refreshing access token...'
        );
        yield* refreshAccessToken;
        return yield* performFetch<T>(input, queryParams, true);
      })
    )
  );

export const youtubeInfinitePaginatedFetcher = <T>(
  input: Input,
  queryParams?: YoutubeQueryParams,
  prevItems: T[] = []
): Effect.Effect<
  T[],
  YoutubeAPIError | YoutubeRefreshAccessTokenError | YoutubeUnauthorizedError,
  ConfigService | YoutubeAccessTokenRef
> =>
  youtubeFetcher<PaginatedYoutubeResponse<T>>(input, queryParams).pipe(
    Effect.flatMap(({ nextPageToken, items }) =>
      nextPageToken
        ? youtubeInfinitePaginatedFetcher<T>(
            input,
            { ...queryParams, pageToken: nextPageToken },
            [...prevItems, ...items]
          )
        : Effect.succeed([...prevItems, ...items])
    )
  );

const performFetch = <T>(
  input: Input,
  queryParams?: YoutubeQueryParams,
  fromRefreshToken = false
) =>
  Effect.gen(function* () {
    const accessTokenRef = yield* YoutubeAccessTokenRef;
    const accessToken = yield* Ref.get(accessTokenRef);

    const url = buildYoutubeUrl(
      typeof input === 'string' ? input : input.url,
      queryParams
    );

    const props: RequestInit = {
      method: typeof input === 'string' ? 'GET' : input.method,
      body:
        typeof input === 'object' && input.body !== undefined
          ? JSON.stringify(input.body)
          : undefined,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    yield* Effect.log(`[YT FETCHER] ${props.method} ${url}`);
    const response = yield* Effect.promise(() => fetch(url, props));

    if (response.status === 401 && !fromRefreshToken)
      return yield* Effect.fail(
        new YoutubeUnauthorizedError({ error: response })
      );

    if (!response.ok)
      return yield* Effect.fail(
        new YoutubeAPIError({
          endpoint: url,
          error: response,
          statusCode: response.status
        })
      );

    const data = yield* Effect.promise(() => response.json() as Promise<T>);
    return data;
  });

const refreshAccessToken = Effect.gen(function* () {
  const config = yield* ConfigService;
  const accessTokenRef = yield* YoutubeAccessTokenRef;

  const response = yield* Effect.tryPromise({
    try: () =>
      fetch(YOUTUBE_REFRESH_TOKEN_URL, {
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: config.YOUTUBE_CLIENT_ID,
          client_secret: config.YOUTUBE_CLIENT_SECRET,
          refresh_token: config.YOUTUBE_REFRESH_TOKEN
        })
      }),
    catch: (error) => {
      return new YoutubeRefreshAccessTokenError({ error });
    }
  });

  const data = yield* Effect.promise(
    () => response.json() as Promise<YoutubeRefreshTokenResponse>
  );

  yield* Ref.update(accessTokenRef, () => data.access_token);
  yield* Effect.log('Access token refreshed');
});
