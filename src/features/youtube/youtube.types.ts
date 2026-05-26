import type { YOUTUBE_REGION_CODE_FR } from './youtube.constants';

export type YoutubeResponse<T> = {
  items: T[];
  kind: string;
  etag: string;
};

export type PaginatedYoutubeResponse<T> = YoutubeResponse<T> & {
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type YoutubeVideo = {
  id: string;
  etag: string;
  kind: 'youtube#video';
  snippet: YoutubeVideoSnippet;
  statistics: YoutubeVideoStatistics;
};

export type YoutubeVideoSnippet = {
  title: string;
  tags: string[];
  channelId: string;
  categoryId: string;
  publishedAt: string;
  description: string;
  channelTitle: string;
  defaultLanguage: string;
  liveBroadcastContent: string;
  defaultAudioLanguage: string;
  thumbnails: YoutubeThumbnails;
  localized: { title: string; description: string };
};

export type YoutubeVideoStatistics = {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
};

export type YoutubeThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type YoutubeThumbnailSize =
  | 'default'
  | 'medium'
  | 'high'
  | 'standard'
  | 'maxres';

export type YoutubeThumbnails = Partial<
  Record<YoutubeThumbnailSize, YoutubeThumbnail>
>;

export type YoutubePart = 'snippet' | 'statistics' | (string & {});

export type YoutubeQueryParams = Partial<{
  part: YoutubePart[];
  maxResults: number;
  chart: 'mostPopular' | (string & {});
  regionCode: typeof YOUTUBE_REGION_CODE_FR;
}>;

export type YoutubeRefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token_expires_in: number;
};
