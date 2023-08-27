export type Attribute = {
  [key: string]: string | number;
};

export type Car = {
  name: string;
  color: string;
  id: number;
};
export type UpdateCarDto = {
  name: string;
  color: string;
};

export type Route = {
  title: string;
  url: string;
};

export type MethodsHTTP = 'DELETE' | 'GET' | 'POST' | 'PATCH' | 'PUT';

export enum Path {
  Garage = 'garage',
  Engine = 'engine',
  Winners = 'winners',
}
export enum Engine {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive',
}
export type StartEngine = {
  velocity: number;
  distance: number;
};
export type RunRes = {
  success: true;
};
export type Winner = {
  id: number;
  carId: number;
  wins: number;
  time: number;
  color: string;
  name: string;
};
export type SetWinner = {
  wins: number;
  time: number;
};
export type CreateWinner = {
  carId: number;
  wins: number;
  time: number;
  color: string;
  name: string;
};
export enum SortWinner {
  'id' = 'id',
  'wins' = 'wins',
  'time' = 'time',
}
export enum SortOrderWinner {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}
