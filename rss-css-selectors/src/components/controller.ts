import { EventEmitter } from './emitter';
import { ILevels } from './utils/interface';
import { levels } from './levels';

export class Controller {
  public currentLevel: ILevels;

  private complitedLevels: ILevels[] = [];

  public eventEmitter = new EventEmitter();

  // constructor() {
  //   [this.currentLevel] = levels;
  // }

  public upDatelevel(takenLevel: ILevels): ILevels {
    this.currentLevel = levels.find((level) => level.id === takenLevel.id);
    console.log('controller', this.currentLevel);
    return this.currentLevel;
  }

  public getCompletedLevels(level: ILevels): ILevels[] {
    this.complitedLevels.push(level);
    return this.complitedLevels;
  }
}
