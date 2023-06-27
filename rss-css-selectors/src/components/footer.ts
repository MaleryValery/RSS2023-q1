import { ComponentCreate } from './ComponentCreate';

class Footer extends ComponentCreate {
  constructor() {
    super('footer', 'footer');
    const footerContentBox = new ComponentCreate('div', 'footer__content-wrappter');
    const texBox = new ComponentCreate('div', 'footer__text-wrappter');
    const linkToOrigin = new ComponentCreate('a', 'footer__link', {
      textContent: 'CSS Diner clone',
      href: 'https://flukeout.github.io/',
    });
    const textContent = new ComponentCreate('span', 'text-content', {
      textContent: ' is made by ',
    });
    const linkToStudent = new ComponentCreate('a', 'footer__link', {
      textContent: 'MaleryValery',
      href: 'https://github.com/MaleryValery',
    });
    const year = new ComponentCreate('span', 'footer__year', {
      textContent: `${new Date().getFullYear()}`,
    });
    const imgSchool = new ComponentCreate('a', 'footer__link-scholl', {
      href: 'https://rs.school/js/',
    });
    const imgGithub = new ComponentCreate('a', 'footer__link-github', {
      href: 'https://flukeout.github.io/',
    });
    this.appendComponent(footerContentBox);
    texBox.appendComponent(linkToOrigin, textContent, linkToStudent, year);
    footerContentBox.appendComponent(imgSchool, texBox, imgGithub);
  }
}

export { Footer };
