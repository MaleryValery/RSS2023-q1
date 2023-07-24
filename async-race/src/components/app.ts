import { Header } from './header';
import { Garage } from './garage';
import { Winners } from './winners';
import { Cars } from './car';
import { RouteElement } from './routes/route';

import { View } from './view';
import { Route } from './utils/types';

export class App extends View {
  private header = new Header(this.emitter);

  private garage = new Garage(this.emitter);

  private winners = new Winners(this.emitter);

  private cars = new Cars(this.emitter);

  private wrapper!: HTMLElement;

  private routes: Route[] = [
    { title: 'garage', url: 'garage' },
    { title: 'winners', url: 'winners' },
  ];

  private routeElemetns: RouteElement[] = [this.garage, this.winners];

  public appendElement(parent: HTMLElement): void {
    this.wrapper = super.renderElement('div', 'main-wrapper');

    parent.append(this.wrapper);
    this.garage.appendElement(this.wrapper);
    this.cars.appendElement(this.garage.wrapper);
    this.emitter.subscribe('routeChanged', (route: Route) => this.onChangeRoute(route));
    this.header.appendElement(this.wrapper);
    this.winners.appendElement(this.wrapper);
  }

  public onChangeRoute(route: Route): void {
    const activePage = this.routeElemetns.find((page) => page.url === route.url);
    const hiddenPage = this.routeElemetns.find((page) => page.url !== route.url);

    activePage?.show();
    hiddenPage?.hide();
  }
}
