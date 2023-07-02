import { IEmitter, ILevels } from './utils/interface';

class EventEmitter {
  public events: IEmitter;

  constructor() {
    this.events = {};
  }

  public subscribe(
    eventName: string,
    // TODO return types after check
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: (arg?: any /* level?: ILevels, animation?: string, target?: Event */) => void,
  ): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
    console.log(this.events);
  }

  public unsubscribe(eventName: string, fn: () => void): void {
    this.events[eventName] = this.events[eventName].filter((eventCallback) => fn !== eventCallback);
  }

  public emit(eventName: string, args: number | string | ILevels | Event): void {
    const event = this.events[eventName];
    if (event) event.forEach((callback) => callback.call(this, args));
  }
}

export { EventEmitter };
