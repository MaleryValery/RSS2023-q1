import News from './news/news';
import Sources from './sources/sources';
import { NewsDrawInterface, SourcesDrawInterface } from '../app/interface';
import { RespNewsType, RespSourceType } from '../app/types';

export class AppView {
  constructor(private news: NewsDrawInterface, private sources: SourcesDrawInterface) {
    this.news = new News();
    this.sources = new Sources();
  }

  private drawNews(data: RespNewsType): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  private drawSources(data: RespSourceType): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
