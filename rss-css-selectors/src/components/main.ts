import { ILevels } from './utils/interface';
import { View } from './view';

class Main extends View {
  public main!: HTMLElement;

  public subHeading!: HTMLElement;

  public helper!: HTMLButtonElement;

  public render(parent: HTMLElement): void {
    this.main = super.renderComponent('div', 'content-box');
    const contentBox = super.renderComponent('div', 'content-box');
    this.helper = super.renderComponent('button', 'help-button', {}, 'help me!') as HTMLButtonElement;
    this.subHeading = super.renderComponent('h2', 'sub-heading', { textContent: 'Name of level' });

    parent.append(this.main);
    this.main.append(contentBox);
    contentBox.append(this.subHeading, this.helper);
    this.helper.addEventListener('click', this.helpCall.bind(this));
    this.onLevelChange();
  }

  public changeHeader(level: ILevels): void {
    this.subHeading.textContent = level.doThis as string;
  }

  public onLevelChange(): void {
    this.emitter?.subscribe('updateLevel', (level?: ILevels) => {
      if (level) this.changeHeader(level);
    });
  }

  public helpCall(): void {
    const storage = localStorage.getItem('currentLevel');
    if (storage) {
      const mainLevel: ILevels = JSON.parse(storage);
      if (mainLevel) this.emitter?.emit('hint', mainLevel);
    }
  }
}

export { Main };
