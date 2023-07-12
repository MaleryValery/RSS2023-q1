import { EventEmitter } from './emitter';
import { ILevels } from './utils/interface';
import { levels } from './levels';

export class Controller {
  public currentLevel!: ILevels;

  public complitedLevels: ILevels[] = [];

  public eventEmitter = new EventEmitter();

  public gameOver!: boolean;

  public upDatelevel(takenLevel: ILevels): ILevels {
    const coosenLevel = levels.find((level) => level.id === takenLevel.id);
    if (coosenLevel) this.currentLevel = coosenLevel;
    console.log('controller current', this.currentLevel);
    this.setStorageCurrent();
    return this.currentLevel;
  }

  public getCompletedLevels(level: ILevels): ILevels[] {
    this.getStorageCompleted();
    const isIncluded: string | undefined = this.complitedLevels
      .map((lev) => JSON.stringify(lev))
      .find((lev) => lev === JSON.stringify(level));
    if (!isIncluded) this.complitedLevels.push(level);
    this.setStorageCompleted();
    return this.complitedLevels;
  }

  public getStorageCompleted(): void {
    const storage = localStorage.getItem('completedLevels');
    if (storage) {
      const completedLevelsData: ILevels[] = JSON.parse(storage);
      if (completedLevelsData) {
        this.complitedLevels = completedLevelsData;
        console.log('completedLevelsData', this.complitedLevels);
      }
    }
  }

  public setStorageCurrent(): void {
    localStorage.setItem('currentLevel', JSON.stringify(this.currentLevel));
  }

  public setStorageCompleted(): void {
    localStorage.setItem('completedLevels', JSON.stringify(this.complitedLevels));
  }

  public onReset(): void {
    this.eventEmitter.subscribe('onReset', () => this.resetProgress());
  }

  public resetProgress(): void {
    if (!localStorage.getItem('completedLevels')) return;
    const storage = localStorage.getItem('completedLevels');
    if (storage) {
      const completedLevelsData: ILevels[] = JSON.parse(storage);
      completedLevelsData.forEach((level) => {
        document.getElementById(String(level.id))?.classList.remove('completed');
      });
    }
    this.complitedLevels = [];
    localStorage.removeItem('completedLevels');
    localStorage.removeItem('currentLevel');
    [this.currentLevel] = levels;
    const tableElement = document.querySelector('.table-top');
    if (tableElement) tableElement.innerHTML = '';
    this.gameOver = false;
  }
}
