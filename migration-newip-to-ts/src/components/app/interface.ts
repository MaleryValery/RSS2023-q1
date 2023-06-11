import { Articles, Sourses, RespNewsType, RespSourceType } from './types';

// TODO ask Alex about almost the same interface

export interface NewsDrawInterface {
  draw(data: Articles[]): void;
}

export interface SourcesDrawInterface {
  draw(data: Sourses[]): void;
}

export interface AppViewInterface {
  news: NewsDrawInterface;
  sources: SourcesDrawInterface;
  drawNews(data?: RespNewsType): void;
  drawSources(data?: RespSourceType): void;
}
