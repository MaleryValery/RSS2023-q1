import { ComponentCreate } from './ComponentCreate';

class Header extends ComponentCreate {
  constructor() {
    super('header', 'header');
    const heading = new ComponentCreate('h1', 'fheading', {
      textContent: 'CSS Selectors',
    });
    const navHeader = new ComponentCreate('nav', 'nav');
    const navList = new ComponentCreate('ul', 'nav__list list');
    const listElem1 = new ComponentCreate('li', 'list__item');
    const listElem2 = new ComponentCreate('li', 'list__item');
    const linkToTwitter = new ComponentCreate('a', 'list__link list__link-tw', {
      href: 'https://twitter.com/?lang=ru',
    });
    const linkToFb = new ComponentCreate('a', 'list__link list__link-fb', {
      href: 'https://www.facebook.com/',
    });
    this.appendComponent(heading, navHeader);
    navHeader.appendComponent(navList);
    navList.appendComponent(listElem1, listElem2);
    listElem1.appendComponent(linkToTwitter);
    listElem2.appendComponent(linkToFb);
  }
}

export { Header };

// function createHeader(): void {
//   const body = document.querySelector('.body');
//   const mainConteiner = document.createElement('div');
//   mainConteiner.classList.add('wrapper');
//   body.append(mainConteiner);
//   mainConteiner.insertAdjacentHTML(
//     'afterbegin',
//     ` <div class="game-field__wrapper">
//       <header class="header">
//       <h1 class="heading">CSS Selectors</h1>
//       <nav class="nav">
//       <ul class="nav__list list">
//         <li class="list__item"><a class="list__link list__link-school" href="https://rs.school/js/"></a></li>
//         <li class="list__item"><a class="list__link list__link-github" href="https://github.com/MaleryValery"></a></li>
//       </ul>
//     </nav>
//     </header>
//     </div>
//   `,
//   );
// }

// export { createHeader };
