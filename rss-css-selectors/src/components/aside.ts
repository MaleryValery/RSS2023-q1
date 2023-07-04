import { levels } from './levels';
import { ILevels } from './utils/interface';
import { Level } from './utils/types';
import { View } from './view';
// import { controller } from './controller';

class Aside extends View {
  public aside: HTMLElement;

  public levelsList: HTMLElement;

  public levelName: HTMLElement;

  public arrLevels: HTMLElement[] = [];

  public levelID: number;

  public render(parent: HTMLElement): void {
    this.aside = super.renderComponent('aside', 'levels-of-game__wrapper');

    const asideHeading = super.renderComponent('h2', 'sub-heading', {
      textContent: 'Choose a level',
    });
    this.levelsList = super.renderComponent('ul', 'levels-list');
    parent.append(this.aside);
    this.aside.append(asideHeading, this.levelsList);
    this.addLevels(levels, this.levelsList);

    this.onWinLevel();
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
    let levelName: HTMLElement;
    if (e) {
      const eventTarget = e.target as Element;
      levelName = eventTarget.closest('.levels-list__name');
      console.log(eventTarget);
      this.levelID = +levelName.getAttribute('id');
    }
    if (id) {
      this.levelID = id;
      levelName = document.getElementById(String(id));
    }
    this.onLevelChange(levels[this.levelID]);
    levelName.classList.add('active');
    console.log(levels[this.levelID].id);
    this.controller.upDatelevel(levels[this.levelID]);
    return levels[this.levelID];
  }

  public onLevelChange(level: ILevels): void {
    this.emitter.emit('updateLevel', level);
    this.arrLevels.forEach((levelName) => {
      if (levelName.classList.contains('active')) levelName.classList.remove('active');
    });
  }

  public onWinLevel(): void {
    this.emitter.subscribe('winLevel', (level: ILevels) => this.addCompletedClass(level));
  }

  public addCompletedClass(level: ILevels): void {
    document.getElementById(String(level.id)).classList.add('completed');
    if (this.levelID < levels.length - 1) {
      this.levelID += 1;
      setTimeout(() => this.getDataLevel(null, this.levelID), 500);
    }
  }
}
export { Aside };
