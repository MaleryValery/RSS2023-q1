import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://rss-news-api.onrender.com/', {
      apiKey: '35c9f99c8367463e87a3c21225c94af8', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
