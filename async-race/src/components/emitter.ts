type CallBack<T> = (data: T) => void;

export class EventEmitter {
  private subscriberMap: Map<string, CallBack<unknown>[]> = new Map<string, CallBack<unknown>[]>();

  public subscribe<T>(event: string, callback: CallBack<T>): void {
    const eventCallbacks = this.subscriberMap.get(event) || [];
    if (!this.subscriberMap.has(event)) {
      this.subscriberMap.set(event, [callback as CallBack<unknown>]);
    } else this.subscriberMap.set(event, [...eventCallbacks, callback as CallBack<unknown>]);
  }

  public unsubscribe<T>(event: string, callback: CallBack<T>): void {
    const eventCallbacks = this.subscriberMap.get(event) || [];
    if (this.subscriberMap.has(event)) {
      this.subscriberMap.set(
        event,
        eventCallbacks.filter((fn) => fn !== callback),
      );
    }
  }

  public onEmit<T>(event: string, param?: T): void {
    const subscriber = this.subscriberMap.get(event);
    if (subscriber) {
      subscriber.forEach((fn) => fn(param));
    }
  }
}
