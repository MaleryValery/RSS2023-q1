import { EventEmitter } from './emitter';
import { Controller } from './controller';
import { Attributes } from './utils/types';

abstract class View {
  constructor(protected emitter?: EventEmitter, protected controller?: Controller) {}

  public abstract render(parent: HTMLElement): void;

  public renderComponent(tag: string, className: string, attributes?: Attributes, textContent?: string): HTMLElement {
    const component = document.createElement(tag);
    component.className = className;
    if (textContent) component.textContent = textContent;
    if (attributes) Object.assign(component, attributes);

    return component;
  }
}

export { View };
