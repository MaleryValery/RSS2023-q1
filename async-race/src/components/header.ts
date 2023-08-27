import { View } from './view';
import { Route } from './utils/types';

export class Header extends View {
  private subtitle!: HTMLElement;

  private navElements: HTMLElement[] = [];

  private routes: Route[] = [
    { title: 'garage', url: 'garage' },
    { title: 'winners', url: 'winners' },
  ];

  public appendElement(parent: HTMLElement): void {
    const header = super.renderElement('header', 'header');
    const heading = super.renderElement('h1', 'heading', { textContent: 'async-Race' });
    const headerContent = super.renderElement('div', 'header-content');
    const headerNav = super.renderElement('nav', 'nav');
    this.subtitle = super.renderElement('h2', 'subtitle', { textContent: 'async-Race' });
    const texBox = super.renderElement('div', 'header__text-wrappter');

    parent.append(header);
    header.append(heading, texBox, headerContent);

    headerContent.append(this.subtitle, headerNav);

    this.routes.forEach((route) => {
      const navLink = super.renderElement('a', `${route.title}-link nav-link`, { textContent: route.title });
      navLink.setAttribute('url', route.url);
      this.navElements.push(navLink);
      headerNav.append(navLink);
    });
    this.changeRoute(this.routes[0]);

    headerNav.addEventListener('click', this.onChangeRoute.bind(this));
  }

  private changeRoute(route: Route): void {
    this.subtitle.innerHTML = route.title;
    this.emitter.onEmit('routeChanged', route);
  }

  private onChangeRoute(event: Event): void {
    const targetLink = event.target as HTMLElement;
    const url = targetLink.getAttribute('url');
    const route = this.routes.find((link) => link.url === url);
    if (route) this.changeRoute(route);
  }
}
