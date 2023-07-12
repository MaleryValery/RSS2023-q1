import { IEmitter, ILevels } from './utils/interface';

type Listener = (level?: ILevels, animation?: string, target?: Event) => void;

class EventEmitter {
  public events: IEmitter;

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: string, fn: Listener): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }

  public unsubscribe(eventName: string, fn: () => void): void {
    this.events[eventName] = this.events[eventName].filter((eventCallback) => fn !== eventCallback);
  }

  public emit(eventName: string, args?: ILevels | undefined): void {
    const event = this.events[eventName];
    if (event) event.forEach((callback: Listener) => callback.call(this, args));
  }
}

export { EventEmitter };
