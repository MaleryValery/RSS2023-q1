import { Attribute } from './utils/types';

export abstract class View {
  public abstract appendElement(parent: HTMLElement): void;

  public renderElement(tag: string, className?: string, attribute?: Attribute): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (attribute) Object.assign(element, attribute);
    return element;
  }
}
