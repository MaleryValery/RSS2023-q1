import { View } from '../view';

export abstract class RouteElement extends View {
  public abstract url: string;

  private parent!: HTMLElement;

  public wrapper!: HTMLElement;

  private isHidden = true;

  public render(parent: HTMLElement): void {
    this.parent = parent;
    this.wrapper = document.createElement('section');
    this.wrapper.className = `${this.url}-wrapper`;
    this.wrapper.setAttribute('url', this.url);
  }

  public show(): void {
    if (this.isHidden) {
      this.isHidden = false;
      this.parent.appendChild(this.wrapper);
      console.log('show', 'parrent:', this.parent, 'child:', this.wrapper);
    }
  }

  public hide(): void {
    if (!this.isHidden) {
      this.isHidden = true;
      this.parent.removeChild(this.wrapper);
      console.log('hide', 'parrent:', this.parent, 'child:', this.wrapper);
    }
  }
}
