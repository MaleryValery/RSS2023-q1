import { View } from '../view';

export abstract class RouteElement extends View {
  public abstract url: string;

  private parent!: HTMLElement;

  protected wrapper!: HTMLElement;

  private isHidden = true;

  public render(parent: HTMLElement): void {
    this.parent = parent;
    this.wrapper = document.createElement('div');
  }

  public show(): void {
    if (this.isHidden) {
      this.isHidden = false;
      this.parent.appendChild(this.wrapper);
    }
  }

  public hide(): void {
    if (!this.isHidden) {
      this.isHidden = true;
      this.parent.removeChild(this.wrapper);
    }
  }
}
