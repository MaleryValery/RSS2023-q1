import { View } from './view';

class Header extends View {
  public header!: HTMLElement;

  public render(parent: HTMLElement): void {
    this.header = super.renderComponent('header', 'header');
    const heading = super.renderComponent('h1', 'heading', { textContent: 'CSS Selectors' });
    const navHeader = super.renderComponent('nav', 'nav');
    const navList = super.renderComponent('ul', 'nav__list list');
    const listElemTw = super.renderComponent('li', 'list__item');
    const listElemFb = super.renderComponent('li', 'list__item');
    const linkToTwitter = super.renderComponent('a', 'list__link list__link-tw', {
      href: 'https://twitter.com/?lang=ru',
    });
    const linkToFb = super.renderComponent('a', 'list__link list__link-fb', {
      href: 'https://www.facebook.com/',
    });

    parent.append(this.header);
    this.header.append(heading, navHeader);
    navHeader.append(navList);
    navList.append(listElemTw, listElemFb);
    listElemFb.append(linkToTwitter);
    listElemTw.append(linkToFb);
  }
}

export { Header };
