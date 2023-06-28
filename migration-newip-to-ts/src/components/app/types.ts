export type RecordTypeOptions = Record<string, string>;

export type SourcesType = Record<string, string>;

export type GetRepsConfig = {
  endpoint: string;
  oprions?: SourcesType;
  options?: {
    sources?: string;
  };
};

export type CallbackGetResp = <T extends RespSourceType>(data?: T) => void;

export type Sourse = {
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

export type Article = {
  readonly author: string | null;
  readonly content: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly source: ArticleSourse;
  readonly title: string;
  readonly url: string;
  readonly urlToImage: string;
};

export type RespNewsType = {
  articles: Article[];
  status: string;
  totalResults: number;
};

export type RespSourceType = {
  sources: Sourse[];
  status: string;
};

export enum ErrosType {
  NotFound = 404,
  Unauthorized = 401,
}
