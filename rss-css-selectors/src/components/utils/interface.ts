import { Level } from './types';

export interface ILevels {
  [key: string]: Level;
}

export interface IEmitter {
  [key: string]: (() => void)[];
}
