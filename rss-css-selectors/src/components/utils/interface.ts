import { Level } from './types';

export interface ILevels {
  // id: number;
  [key: string]: Level;
}

export interface IEmitter {
  [key: string]: (() => void)[];
}
