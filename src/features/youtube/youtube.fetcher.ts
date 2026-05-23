import { Effect, Ref } from 'effect';
import { YoutubeAccessTokenRef } from './youtube.service';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const buildUrl = (url: string) => 'https://jsonplaceholder.typicode.com/todos';
// const buildUrl = (url: string) => `${YOUTUBE_BASE_API_URL}${url}`;

export const youtubeFetcher = <T>(
  input: string | { method: Method; url: string; body?: Object }
) =>
  Effect.gen(function* () {
    const accessTokenRef = yield* YoutubeAccessTokenRef;
    const accessToken = yield* Ref.get(accessTokenRef);

    const url = buildUrl(typeof input === 'string' ? input : input.url);

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

    return yield* Effect.tryPromise({
      try: () => fetch(url, props).then((res) => res.json() as Promise<T>),
      catch: (error) => new Error(`Failed to fetch ${url}: ${error}`)
    });
  });
