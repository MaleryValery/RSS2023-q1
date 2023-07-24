import { View } from './view';
import { Route } from './utils/types';

export class Header extends View {
  private subtitle!: HTMLElement;

  private navElements: HTMLElement[] = [];
  // private navBtnGarage!: HTMLElement;

  // private navBtnWinners!: HTMLElement;
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
    // const year = super.renderElement('span', 'header__year', {
    //   textContent: `${new Date().getFullYear()}`,
    // });
    const imgSchool = super.renderElement('a', 'header__link-scholl', {
      href: 'https://rs.school/js/',
    });
    const imgGithub = super.renderElement('a', 'header__link-github', {
      href: 'https://github.com/MaleryValery',
    });

    parent.append(header);
    header.append(heading, texBox, headerContent);
    texBox.append(imgGithub, imgSchool);
    headerContent.append(this.subtitle, headerNav);

    this.routes.forEach((route) => {
      const navLink = super.renderElement('a', `${route.title}-link nav-link`, { textContent: route.title });
      navLink.setAttribute('url', route.url);
      this.navElements.push(navLink);
      headerNav.append(navLink);
    });
    this.onChangeRoute(this.routes[0]);

    headerNav.addEventListener('click', (event: Event) => {
      const targetLink = event.target as HTMLElement;
      const url = targetLink.getAttribute('url');
      const route = this.routes.find((link) => link.url === url);
      if (route) this.onChangeRoute(route);
    });
  }

  private onChangeRoute(route: Route): void {
    this.subtitle.innerHTML = route.title;

    // const activePage = this.navElements.find((elem) => elem.getAttribute('url') === route.url);
    // const hiddenPage = this.navElements.filter((elem) => elem.getAttribute('url') !== route.url);

    // activePage?.classList.add('show');
    // hiddenPage.forEach((element) => element.classList.remove('hidden'));

    this.emitter.onEmit('routeChanged', route);
  }
}
