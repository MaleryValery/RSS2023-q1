import { EventEmitter } from './emitter';
import { ILevels } from './utils/interface';
import { levels } from './levels';

export class Controller {
  public currentLevel: ILevels;

  public complitedLevels: ILevels[] = [];

  public eventEmitter = new EventEmitter();

  // constructor() {
  //   this.upDatelevel(levels[0]);
  // }

  public upDatelevel(takenLevel: ILevels): ILevels {
    this.currentLevel = levels.find((level) => level.id === takenLevel.id);
    console.log('controller current', this.currentLevel);
    this.setStorageCurrent();
    return this.currentLevel;
  }

  public getCompletedLevels(level: ILevels): ILevels[] {
    this.complitedLevels.push(level);
    console.log('controller complitedLevels', this.complitedLevels);
    this.setStorageCompleted();
    return this.complitedLevels;
  }

  public setStorageCurrent(): void {
    localStorage.setItem('currentLevel', JSON.stringify(this.currentLevel));
  }

  public setStorageCompleted(): void {
    localStorage.setItem('completedLevels', JSON.stringify(this.complitedLevels));
  }
}
