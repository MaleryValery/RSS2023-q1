import { Header } from './header';
import { Garage } from './garage';
import { Winners } from './winners';

export class App {
  public header = new Header();

  public garage = new Garage();

  public winners = new Winners();

  public render(): void {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.body.append(wrapper);
    this.header.appendElement(wrapper);
    this.garage.appendElement(wrapper);
    this.winners.appendElement(wrapper);
  }
}
