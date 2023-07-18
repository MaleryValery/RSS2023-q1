import { View } from './view';

export class Header extends View {
  public subtitle!: HTMLElement;

  public navBtnGarage!: HTMLElement;

  public navBtnWinners!: HTMLElement;

  public appendElement(parent: HTMLElement): void {
    const header = super.renderElement('header', 'header');
    const heading = super.renderElement('h1', 'heading', { textContent: 'async-Race' });
    const headerContent = super.renderElement('div', 'header-content');
    const headerNav = super.renderElement('nav', 'nav');
    this.navBtnGarage = super.renderElement('a', 'garage-link', { textContent: 'garage' });
    this.navBtnWinners = super.renderElement('a', 'winners-link', { textContent: 'winners' });
    this.subtitle = super.renderElement('h2', 'subtitle', { textContent: 'async-Race' });

    parent.append(header);
    header.append(heading, headerContent);
    headerContent.append(this.subtitle, headerNav);
    headerNav.append(this.navBtnGarage, this.navBtnWinners);
  }
}
