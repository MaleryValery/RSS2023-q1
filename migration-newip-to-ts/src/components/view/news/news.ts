import './news.css';
import { Article } from '../../app/types';
import { DrawInterface } from '../../app/interface';

class News implements DrawInterface {
  public draw(data: Article[]): void {
    const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
    const newsConteiner: HTMLElement | null = document.querySelector('.news');

    news.forEach((item: Article, idx: number) => {
      const newsClone = newsItemTemp?.content.cloneNode(true) as DocumentFragment;
      if (newsClone) {
        const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');
        const newsImg: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
        const newsAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
        const newsDate: HTMLElement | null = newsClone.querySelector('.news__description-title');
        const newsTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
        const newsDiscrSourse: HTMLElement | null = newsClone.querySelector('.news__description-source');
        const newsDiscrContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
        const newsMore: HTMLElement | null = newsClone.querySelector('.news__read-more a');

        if (newsItem && idx % 2) newsItem.classList.add('alt');
        if (newsImg)
          newsImg.style.backgroundImage = `url(${
            item.urlToImage || 'https://ajr.org/wp-content/themes/AJR-theme/images/news-placeholder.jpg'
          })`;
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
