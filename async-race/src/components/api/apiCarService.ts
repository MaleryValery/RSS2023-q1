import { Path, Car, SetNewCar, IPathPagination, Engine, SrartEngine, RunRes } from '../utils/types';
import { ApiService } from './apiService';

export class CarsApiService {
  public static getAllCars(): Promise<Car[]> {
    console.log('CarsApiService');
    return ApiService.get(Path.garage);
  }

  public static createCar(transfer: SetNewCar, headers: HeadersInit): Promise<Car> {
    return ApiService.post(Path.garage, transfer, headers);
  }

  public static getCar(idCar: number): Promise<Car> {
    return ApiService.get(`${Path.garage}/${idCar}`);
  }

  public static deleteCar(idCar: number): Promise<void> {
    return ApiService.delete(`${Path.garage}/${idCar}`);
  }

  public static updateCar(idCar: number, transfer: SetNewCar, headers: HeadersInit): Promise<Car> {
    return ApiService.put(`${Path.garage}/${idCar}`, transfer, headers);
  }

  public static getPagination(value: number, limit: IPathPagination): Promise<Car[]> {
    return ApiService.getPages(`${Path.garage}?_page=${value}&${limit.key}=${limit.value}`);
  }

  public static onEnginCar(idCar: number, status: Engine): Promise<SrartEngine> {
    return ApiService.runEngine(`${Path.engine}?id=${idCar}&status=${status}`);
  }

  public static onRunCar(idCar: number, status: Engine): Promise<RunRes> {
    return ApiService.runEngine(`${Path.engine}?id=${idCar}&status=${status}`);
  }
}
