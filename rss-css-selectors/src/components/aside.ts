import { levels, ILevels } from './levels';
import { ComponentCreate } from './ComponentCreate';

class Aside extends ComponentCreate {
  constructor() {
    super('aside', 'levels-of-game__wrapper');

    const asideHeading = new ComponentCreate('h2', 'sub-heading', {
      textContent: 'Choose a level',
    });
    const levelsList = new ComponentCreate('ul', 'levels-list');
    this.appendComponent(asideHeading);
    this.appendComponent(levelsList);
    this.addLevels(levels, levelsList.newComponent);
  }

  protected addLevels(list: ILevels[], levelsList: HTMLElement): void {
    list.forEach((element, i) => {
      const index: HTMLElement = document.createElement('span');
      const checkMark: HTMLElement = document.createElement('span');
      const linkLevel: HTMLElement = document.createElement('a');
      const levelName: HTMLElement = document.createElement('li');
      index.classList.add('levels-number');
      checkMark.classList.add('checkmark');
      linkLevel.classList.add('levels__link');
      levelName.classList.add('levels-list__name');
      levelName.setAttribute('id', String(i));
      index.textContent = String(Number(i + 1));
      linkLevel.textContent = element.syntax as string;
      levelsList.append(levelName);
      levelName.append(checkMark, index, linkLevel);
    });
  }

  // protected getAnswer() {
  //   return;
  // }
  // protected getHTMLStruct() {}
  public getHeading(id: number): string | string[] {
    return levels[id].doThis;
  }

  public getMarkupEditor(id: number): string | string[] {
    return levels[id].boardMarkup;
  }

  public getSelector(id: number): string | string[] {
    return levels[id].selector;
  }

  // public getMarkupHTML(id: number): string | string[] {
  //   return levels[id].examples;
  // }
}

// function createAside(): void {
//   const mainConteiner = document.querySelector('.wrapper');
//   const aside = document.createElement('aside');
//   aside.classList.add('levels-of-game__wrapper');
//   mainConteiner?.append(aside);

//   aside.insertAdjacentHTML(
//     'beforeend',
//     ` <h2 class="sub-heading">Heading for aside</h2>
//   `,
//   );
//   const levelsList = document.createElement('ul');
//   levelsList.classList.add('levels-list');
//   aside.append(levelsList);

//   levels.forEach((level) => {
//     const levelName = document.createElement('li');
//     levelName.classList.add('levels-list__name');
//     levelName.innerHTML = level.syntax;
//     levelsList.append(levelName);
//   });
// }

export { Aside };
