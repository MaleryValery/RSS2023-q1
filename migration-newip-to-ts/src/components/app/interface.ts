import { Articles, Sourses } from './types';

// TODO ask Alex about almost the same interface

export interface NewsDrawInterface {
  draw(data: Articles[]): void;
}

export interface SourcesDrawInterface {
  draw(data: Sourses[]): void;
}
