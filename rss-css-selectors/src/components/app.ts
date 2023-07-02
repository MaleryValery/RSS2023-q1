import { Header } from './header';
import { Main } from './main';
import { Table } from './table';
import { Editor } from './editor';
import { Aside } from './aside';
import { Footer } from './footer';
import { EventEmitter } from './emitter';
import { Controller } from './controller';

class App {
  public emitter = new EventEmitter();

  public controller = new Controller();

  public header = new Header();

  public main = new Main(this.emitter, this.controller);

  public table = new Table(this.emitter, this.controller);

  public editor = new Editor(this.emitter, this.controller);

  public aside = new Aside(this.emitter, this.controller);

  public footer = new Footer();

  public currentLevel;

  constructor() {
    this.currentLevel = 0;
  }

  public render(): void {
    const mainConteiner = document.createElement('div');
    const field = document.createElement('div');
    field.classList.add('game-field__wrapper');
    mainConteiner.classList.add('wrapper');
    document.body.append(mainConteiner);
    mainConteiner.append(field);
    this.header.render(field);
    this.main.render(field);
    this.table.render(this.main.main);
    this.editor.render(this.main.main);
    this.footer.render(field);
    this.aside.render(mainConteiner);
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
      const listItems = document.querySelectorAll('.levels-list__name');
      listItems.forEach((item) => {
        if (item.classList.contains('active')) item.classList.remove('active');
      });
      const id: number = +listItem.id;
      this.currentLevel = id;
      listItem.classList.add('active');
      mainHeading.textContent = this.aside.getHeading(this.currentLevel) as string;
      table.insertAdjacentHTML('afterbegin', `${this.aside.getMarkupEditor(this.currentLevel) as string}`);
      htmlCode.insertAdjacentText(
        'afterbegin',
        `<div class="table">${this.aside.getMarkupEditor(this.currentLevel) as string}\n</div>`,
      );
      // setTimeout(() => {

      // }, 200);
    }
  }

  // public checkAnswer(e: KeyboardEvent): void {
  //   if (e.key === 'Enter') {
  //     const textAria = document.querySelector('.editor__text-aria');
  //     if (textAria.textContent === this.aside.getSelector(this.currentLevel)) {
  //       const listItem = document.querySelector(`#${this.currentLevel}`);
  //       const table = document.querySelector('.table-top');
  //       listItem.classList.add('completed');
  //       table.classList.add('clean');
  //       setTimeout(() => {
  //         table.innerHTML = '';
  //       }, 200);
  //     }
  //   }
  // }
}

export { App };
