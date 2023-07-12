import { View } from './view';

class Footer extends View {
  public footer!: HTMLElement;

  public render(parent: HTMLElement): void {
    this.footer = super.renderComponent('footer', 'footer');
    const footerContentBox = super.renderComponent('div', 'footer__content-wrappter');
    const texBox = super.renderComponent('div', 'footer__text-wrappter');
    const linkToOrigin = super.renderComponent('a', 'footer__link', {
      textContent: 'CSS Diner clone',
      href: 'https://flukeout.github.io/',
    });
    const textContent = super.renderComponent('span', 'text-content', {
      textContent: ' is made by ',
    });
    const linkToStudent = super.renderComponent('a', 'footer__link', {
      textContent: 'MaleryValery',
      href: 'https://github.com/MaleryValery',
    });
    const year = super.renderComponent('span', 'footer__year', {
      textContent: `${new Date().getFullYear()}`,
    });
    const imgSchool = super.renderComponent('a', 'footer__link-scholl', {
      href: 'https://rs.school/js/',
    });
    const imgGithub = super.renderComponent('a', 'footer__link-github', {
      href: 'https://flukeout.github.io/',
    });
    parent.append(this.footer);
    this.footer.append(footerContentBox);
    texBox.append(linkToOrigin, textContent, linkToStudent, year);
    footerContentBox.append(imgSchool, texBox, imgGithub);
  }
}

export { Footer };
