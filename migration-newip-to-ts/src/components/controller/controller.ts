import AppLoader from './appLoader';
// import { RespNewsType, RespSourceType } from '../app/types';

class AppController extends AppLoader {
  public getSources(callback: () => void): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  public getNews(event: Event, callback: () => void): void {
    let targetElement = event.target as HTMLElement;
    if (targetElement && targetElement instanceof HTMLElement) {
      const newsContainer = event.currentTarget as HTMLElement;

      while (targetElement && targetElement !== newsContainer) {
        if (targetElement.classList.contains('source__item')) {
          const sourceId = targetElement.getAttribute('data-source-id');
          if (newsContainer?.getAttribute('data-source') !== sourceId) {
            if (!sourceId) throw new Error('source id is not defined');
            newsContainer?.setAttribute('data-source', sourceId);
            super.getResp(
              {
                endpoint: 'everything',
                options: {
                  sources: sourceId,
                },
              },
              callback,
            );
          }
          return;
        }
        if (targetElement) targetElement = targetElement.parentNode as HTMLElement;
      }
    }
  }
}

export default AppController;
