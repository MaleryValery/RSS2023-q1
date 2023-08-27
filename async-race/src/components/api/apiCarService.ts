import { Path, Car, UpdateCarDto, Engine, SrartEngine, RunRes } from '../utils/types';
import { ApiService } from './apiService';

export class CarsApiService {
  public static getAllCars(): Promise<Car[]> {
    return ApiService.get(Path.Garage);
  }

  public static createCar(dto: UpdateCarDto): Promise<Car> {
    return ApiService.post(Path.Garage, dto);
  }

  public static getCar(carId: number): Promise<Car> {
    return ApiService.get(`${Path.Garage}/${carId}`);
  }

  public static deleteCar(carId: number): Promise<void> {
    return ApiService.delete(`${Path.Garage}/${carId}`);
  }

  public static updateCar(carId: number, dto: UpdateCarDto): Promise<Car> {
    return ApiService.put(`${Path.Garage}/${carId}`, dto);
  }

  public static getPagination(value: number, limit: number): Promise<Car[]> {
    return ApiService.getPages(`${Path.Garage}?_page=${value}&_limit=${limit}`);
  }

  public static onEnginCar(carId: number, status: Engine): Promise<SrartEngine> {
    return ApiService.runEngine(`${Path.Engine}?id=${carId}&status=${status}`);
  }

  public static onRunCar(carId: number, status: Engine): Promise<RunRes> {
    return ApiService.runEngine(`${Path.Engine}?id=${carId}&status=${status}`);
  }
}
