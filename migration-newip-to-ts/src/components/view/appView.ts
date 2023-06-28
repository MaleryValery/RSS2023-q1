import News from './news/news';
import Sources from './sources/sources';
import { AppViewInterface } from '../app/interface';
import { RespNewsType, RespSourceType } from '../app/types';

export class AppView implements AppViewInterface {
  public news: News = new News();

  public sources: Sources = new Sources();

  public drawNews(data?: RespNewsType): void {
    const values = data?.articles ?? [];
    this.news.draw(values);
  }

  public drawSources(data?: RespSourceType): void {
    const values = data?.sources ?? [];
    this.sources.draw(values);
  }
}

export default AppView;
