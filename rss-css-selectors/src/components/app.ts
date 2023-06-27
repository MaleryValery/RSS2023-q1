import { Header } from './header';
import { Main } from './main';
import { Table } from './table';
import { Editor } from './editor';
import { Aside } from './aside';
import { Footer } from './footer';

class App {
  public header;

  public main;

  public table;

  public editor;

  public aside;

  public footer;

  constructor() {
    this.header = new Header();
    this.main = new Main();
    this.table = new Table();
    this.editor = new Editor();
    this.aside = new Aside();
    this.footer = new Footer();

    this.aside.newComponent.addEventListener('click', this.chooseLevel.bind(this));
  }

  public init(): void {
    const body = document.querySelector('.body');
    const mainConteiner = document.createElement('div');
    const field = document.createElement('div');
    field.classList.add('game-field__wrapper');
    mainConteiner.classList.add('wrapper');
    body.append(mainConteiner);
    mainConteiner.append(field);

    field.append(
      this.header.newComponent,
      this.main.newComponent,
      this.table.newComponent,
      this.editor.newComponent,
      this.footer.newComponent,
    );

    mainConteiner.append(this.aside.newComponent);
  }

  protected chooseLevel(e: Event): void {
    const mainHeading = document.querySelector('.sub-heading');
    const htmlCode = document.querySelector('.html-code');
    const elementTarget = e.target as Element;
    const table = document.querySelector('.table-top');
    const listItem = elementTarget.closest('.levels-list__name');
    table.innerHTML = '';
    htmlCode.innerHTML = '';
    if (listItem) {
      const id: number = +listItem.id;
      mainHeading.textContent = this.aside.getHeading(id) as string;
      table.insertAdjacentHTML('afterbegin', `${this.aside.getMarkupEditor(id) as string}`);
      htmlCode.insertAdjacentText(
        'afterbegin',
        `<div class="table">${this.aside.getMarkupEditor(id) as string}\n</div>`,
      );
      setTimeout(() => {
        const tableElement = [...document.querySelectorAll(`.table-top ${this.aside.getSelector(id)}`)];
        if (tableElement) {
          tableElement.forEach((element) => element.classList.add('strobe'));
        }
      }, 200);
    }
  }
}

export { App };
