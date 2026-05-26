import type { YoutubeQueryParams } from './youtube.types';
import { YOUTUBE_API_BASE_URL } from './youtube.constants';

export const buildYoutubeUrl = (
  url: string,
  queryParams?: YoutubeQueryParams
) => {
  const stringifiedQueryParams = Object.entries(queryParams || {})
    .map(
      ([key, value]) =>
        `${key}=${Array.isArray(value) ? value.join(',') : value}`
    )
    .join('&');

  return `${YOUTUBE_API_BASE_URL}${url}?${stringifiedQueryParams}`;
};
