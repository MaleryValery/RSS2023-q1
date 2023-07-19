import { Attribute } from './utils/types';
import { EventEmitter } from './emitter';

export abstract class View {
  constructor(protected readonly emmiter: EventEmitter) {}

  public abstract appendElement(parent: HTMLElement): void;

  public renderElement(tag: string, className?: string, attribute?: Attribute): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (attribute) Object.assign(element, attribute);
    return element;
  }
}
