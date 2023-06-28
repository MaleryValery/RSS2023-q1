import { Article, Sourse, RespNewsType, RespSourceType } from './types';

export interface DrawInterface {
  draw(data: Article[] | Sourse[]): void;
}

export interface AppViewInterface {
  news: DrawInterface;
  sources: DrawInterface;
  drawNews(data?: RespNewsType): void;
  drawSources(data?: RespSourceType): void;
}
