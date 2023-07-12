import { levels } from './levels';
import { ILevels } from './utils/interface';
import { Level } from './utils/types';
import { View } from './view';

class Aside extends View {
  public aside: HTMLElement = super.renderComponent('aside', 'levels-of-game__wrapper');

  public levelsList: HTMLElement = super.renderComponent('ul', 'levels-list');

  public arrLevels: HTMLElement[] = [];

  public levelID!: number;

  public reset!: HTMLElement;

  public levelName!: HTMLElement;

  public render(parent: HTMLElement): void {
    const asideHeading = super.renderComponent('h2', 'sub-heading', {
      textContent: 'Choose a level',
    });
    this.reset = super.renderComponent('button', 'reset-button', {
      textContent: 'restart progress',
    });
    parent.append(this.aside);
    this.aside.append(asideHeading, this.levelsList, this.reset);
    this.addLevels(levels, this.levelsList);

    if (localStorage.getItem('currentLevel') !== null) {
      const storage = localStorage.getItem('currentLevel');
      if (storage) {
        const levelStorage = JSON.parse(storage);
        console.log('levelStorage', levelStorage);
        this.getDataLevel(null, levelStorage.id);
      }
    } else {
      this.getDataLevel(null, 0);
    }
    this.onWinLevel();
    if (localStorage.getItem('completedLevels') !== null) {
      this.addCompletedOnload();
    }
    this.reset.addEventListener('click', () => {
      this.controller?.resetProgress();
      this.getDataLevel(null, 0);
    });
  }

  protected addLevels(list: ILevels[], levelsList: HTMLElement): void {
    list.forEach((element, i) => {
      const index = super.renderComponent('span', 'levels-number', { textContent: String(Number(i + 1)) });
      const checkMark = super.renderComponent('span', 'checkmark');
      const linkLevel = super.renderComponent('a', 'levels__link', { textContent: element.syntax as string });
      this.levelName = super.renderComponent('li', 'levels-list__name', { id: String(i) });
      levelsList.append(this.levelName);
      this.levelName.append(checkMark, index, linkLevel);
      this.arrLevels.push(this.levelName);
      this.levelName.addEventListener('click', this.getDataLevel.bind(this));
    });
  }

  public getHeading(id: number): Level {
    return levels[id].doThis;
  }

  public getMarkupEditor(id: number): Level {
    return levels[id].boardMarkup;
  }

  public getSelector(id: number): Level {
    return levels[id].selector;
  }

  protected getDataLevel(e?: Event | null, id?: number): ILevels {
    let levelName: HTMLElement | null;
    if (e) {
      const eventTarget = e.target as Element;
      levelName = eventTarget.closest('.levels-list__name');
      if (levelName) {
        this.levelID = Number(levelName.getAttribute('id')) ?? Number(levelName.getAttribute('id'));
      }
      console.log('active click', levelName);
      levelName?.classList.add('active');
    }
    if (id || id === 0) {
      this.levelID = id;
      levelName = document.getElementById(String(id));
      console.log('active click', levelName);
      levelName?.classList.add('active');
    }

    this.onLevelChange(levels[this.levelID]);
    this.controller?.upDatelevel(levels[this.levelID]);
    return levels[this.levelID];
  }

  public onLevelChange(level: ILevels): void {
    this.emitter?.emit('updateLevel', level);
    this.arrLevels.forEach((levelName) => {
      if (levelName.classList.contains('active') && Number(levelName.getAttribute('id')) !== this.levelID)
        levelName.classList.remove('active');
    });
  }

  public onWinLevel(): void {
    this.emitter?.subscribe('winLevel', (level?: ILevels) => {
      if (level) this.addCompletedClass(level);
    });
  }

  public addCompletedClass(level: ILevels): void {
    document.getElementById(String(level.id))?.classList.add('completed');
    this.switchNewLevel();
  }

  public switchNewLevel(): void {
    const isAllComplited = this.arrLevels.every((lev) => lev.classList.contains('completed'));
    if (this.levelID < levels.length - 1 && !isAllComplited) {
      this.levelID += 1;
      setTimeout(() => this.getDataLevel(null, this.levelID), 500);
    } else if (!isAllComplited && this.levelID === this.arrLevels.length - 1) {
      const nonComplited = this.arrLevels.find((lev) => !lev.classList.contains('completed'));
      this.levelID = Number(nonComplited?.getAttribute('id'));
      setTimeout(() => this.getDataLevel(null, this.levelID), 500);
    } else this.checkGame();
  }

  public checkGame(): void {
    if (this.controller?.complitedLevels.length === levels.length) {
      this.emitter?.emit('winGame');
    }
  }

  public addCompletedOnload(): void {
    const storage = localStorage.getItem('completedLevels');
    if (storage) {
      const completedLevels: ILevels[] = JSON.parse(storage);
      console.log('completedLevels parse', completedLevels);
      completedLevels.forEach((levelCompled) => {
        document.getElementById(String(levelCompled.id))?.classList.add('completed');
      });
    }
  }

  public setLocalStorage(): void {}
}
export { Aside };
