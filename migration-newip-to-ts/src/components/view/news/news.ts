import './news.css';
import { Articles, HTMLEl } from '../../app/types';
import { NewsDrawInterface } from '../../app/interface';

class News implements NewsDrawInterface {
  public draw(data: Articles[]): void {
    const news: Articles[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
    const newsConteiner: HTMLEl = document.querySelector('.news');

    news.forEach((item: Articles, idx: number) => {
      const newsClone = newsItemTemp?.content.cloneNode(true) as DocumentFragment;
      if (newsClone) {
        const newsItem: HTMLEl = newsClone.querySelector('.news__item');
        const newsImg: HTMLEl = newsClone.querySelector('.news__meta-photo');
        const newsAuthor: HTMLEl = newsClone.querySelector('.news__meta-author');
        const newsDate: HTMLEl = newsClone.querySelector('.news__description-title');
        const newsTitle: HTMLEl = newsClone.querySelector('.news__description-title');
        const newsDiscrSourse: HTMLEl = newsClone.querySelector('.news__description-source');
        const newsDiscrContent: HTMLEl = newsClone.querySelector('.news__description-content');
        const newsMore: HTMLEl = newsClone.querySelector('.news__read-more a');

        if (newsItem && idx % 2) newsItem.classList.add('alt');
        if (newsImg) newsImg.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
        if (newsAuthor) newsAuthor.textContent = item.author || item.source.name;
        if (newsDate) newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
        if (newsTitle) newsTitle.textContent = item.title;
        if (newsDiscrSourse) newsDiscrSourse.textContent = item.source.name;
        if (newsDiscrContent) newsDiscrContent.textContent = item.description;
        if (newsMore) newsMore.setAttribute('href', item.url);
      }

      fragment.append(newsClone);
    });
    if (newsConteiner) {
      newsConteiner.innerHTML = '';
      newsConteiner.appendChild(fragment);
    }
  }
}

export default News;
