import { Header } from './header';
import { Garage } from './garage';
import { Winners } from './winners';

import { View } from './view';

export class App extends View {
  private header = new Header(this.emmiter);

  private garage = new Garage(this.emmiter);

  private winners = new Winners(this.emmiter);

  private wrapper!: HTMLElement;

  public appendElement(parent: HTMLElement): void {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    parent.append(this.wrapper);
    this.header.appendElement(this.wrapper);
    this.garage.appendElement(this.wrapper);
    this.winners.appendElement(this.wrapper);
  }
}
