// import { levels } from './levels';
// import { Controller } from './controller';
// import { EventEmitter } from './emitter';
import { ILevels } from './utils/interface';
// import { levels } from './levels';
import { View } from './view';

class Table extends View {
  public table: HTMLElement;

  public tableTop: HTMLElement;

  public render(parent: HTMLElement): void {
    const tableWrapper = super.renderComponent('div', 'perspective table-wrapper');
    const tableBox = super.renderComponent('div', 'table-box');
    this.table = super.renderComponent('div', 'table');
    this.tableTop = super.renderComponent('div', 'table-top');
    const tableBottom = super.renderComponent('div', 'table-bottom');
    const tableLeftLeg = super.renderComponent('div', 'table-leg');
    const tableRightLeg = super.renderComponent('div', 'table-leg');

    parent.append(tableWrapper);
    tableWrapper.append(tableBox);
    tableBox.append(this.table, this.tableTop);
    tableWrapper.append(tableBottom);
    tableBottom.append(tableLeftLeg, tableRightLeg);
    this.onLevelChange();
    this.onLoseLevel();
    this.onWinLevel();
    this.onWinGame();
  }

  public showApple(level: ILevels): void {
    this.tableTop.innerHTML = '';
    this.tableTop.insertAdjacentHTML('afterbegin', level.boardMarkup as string);
    this.getTableElementsAnimation(level, 'dance');
  }

  public onLevelChange(): void {
    this.emitter.subscribe('updateLevel', (level: ILevels) => this.showApple(level));
  }

  public onWinLevel(): void {
    this.emitter.subscribe('winLevel', (level: ILevels) => this.getTableElementsAnimation(level, 'clean'));
  }

  public onWinGame(): void {
    this.emitter.subscribe('winLevel', () => this.showWinMessage());
  }

  public onLoseLevel(): void {
    this.emitter.subscribe('loseLevel', (level: ILevels) => this.getTableElementsAnimation(level, 'shake'));
  }

  public getTableElementsAnimation(level: ILevels, animation: string): void {
    const tableElement = [...document.querySelectorAll(`.table-top ${level.selector}`)];
    if (tableElement) {
      tableElement.forEach((element) => element.classList.add(`${animation}`));
    }
    if (animation === 'shake') {
      setTimeout(() => {
        tableElement.forEach((element) => element.classList.remove(`${animation}`));
      }, 300);
    }
    if (animation === 'clean') {
      setTimeout(() => {
        tableElement.forEach((element) => element.classList.remove('dance'));
      }, 300);
    }
  }

  public showWinMessage(): void {
    const tableElement = document.querySelector('.table-top');
    tableElement.innerHTML = 'You win! Congrads🎊';
  }
}

export { Table };
