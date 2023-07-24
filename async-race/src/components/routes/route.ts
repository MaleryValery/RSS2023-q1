import { View } from '../view';

export abstract class RouteElement extends View {
  public abstract url: string;

  private parent!: HTMLElement;

  public wrapper!: HTMLElement;

  private isShow = false;

  public render(parent: HTMLElement): void {
    this.parent = parent;
    this.wrapper = document.createElement('section');
    this.wrapper.className = `${this.url}-wrapper`;
    this.wrapper.setAttribute('url', this.url);
  }

  public show(): void {
    if (!this.isShow) {
      this.isShow = true;
      this.parent.appendChild(this.wrapper);
    }
  }

  public hide(): void {
    if (this.isShow) {
      this.isShow = false;
      this.parent.removeChild(this.wrapper);
    }
  }
}
