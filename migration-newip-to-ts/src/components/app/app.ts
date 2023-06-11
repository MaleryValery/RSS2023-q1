import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { AppViewInterface } from './interface';
// import { RespNewsType, RespSourceType } from './types';

class App {
  public controller: AppController;

  public view: AppViewInterface;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourses: HTMLElement | null = document.querySelector('.sources');
    if (sourses) {
      sourses.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
      this.controller.getSources((data) => this.view.drawSources(data));
    }
  }
}

export default App;
