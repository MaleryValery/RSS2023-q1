export type RecordTypeOptions = Record<string, string>;

export type GetRepsConfig = {
  endpoint: string;
  options?: {
    sources?: string;
  };
};

export type Sourses = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};

export type ArticleSourse = {
  id: string;
  name: string;
};

export type Articles = {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: ArticleSourse;
  title: string;
  url: string;
  urlToImage: string;
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
