export type RecordTypeOptions = Record<string, string>;

export type SourcesType = {
  readonly [key: string]: string;
};

export type GetRepsConfig = {
  endpoint: string;
  oprions?: SourcesType;
  options?: {
    sources?: string;
  };
};

export type CallbackGetResp = (data: GetRepsConfig) => void;

export type Sourses = {
  readonly category: string;
  readonly country: string;
  readonly description: string;
  readonly id: string;
  readonly language: string;
  readonly name: string;
  readonly url: string;
};

export type ArticleSourse = {
  id: string;
  name: string;
};

export type Articles = {
  readonly author: string | null;
  readonly content: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly source: ArticleSourse;
  readonly title: string;
  readonly url: string;
  readonly urlToImage: string;
};

export type HTMLEl = HTMLElement | null;

export type RespNewsType = {
  articles: Articles[];
  status: string;
  totalResults: number;
};

export type RespSourceType = {
  sources: Sourses[];
  status: string;
};

export enum ErrosType {
  'notFound' = 404,
  'unauthorized' = 401,
}
