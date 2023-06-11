import News from './news/news';
import Sources from './sources/sources';
import { NewsDrawInterface, SourcesDrawInterface, AppViewInterface } from '../app/interface';
import { RespNewsType, RespSourceType } from '../app/types';

export class AppView implements AppViewInterface {
  public news: NewsDrawInterface;

  public sources: SourcesDrawInterface;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data?: RespNewsType): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data?: RespSourceType): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
