import { CreateWinner, Path, SetWinner, SortOrderWinner, SortWinner, Winner } from '../utils/types';
import { ApiService } from './apiService';

export class ApiWinnersService {
  public static getAllWin(): Promise<Winner[]> {
    return ApiService.get(Path.Winners);
  }

  public static createWin(dto: CreateWinner): Promise<Winner> {
    return ApiService.post(Path.Winners, dto);
  }

  public static getWin(carId: number): Promise<Winner> {
    return ApiService.get(`${Path.Winners}/${carId}`);
  }

  public static deleteWin(carId: number): Promise<void> {
    return ApiService.delete(`${Path.Winners}/${carId}`);
  }

  public static updateWin(winId: number, dto: SetWinner): Promise<Winner> {
    return ApiService.put(`${Path.Winners}/${winId}`, dto);
  }

  public static getPagination(value: number, limit: number): Promise<Winner[]> {
    return ApiService.getPages(`${Path.Winners}?_page=${value}&_limit=${limit}`);
  }

  public static sortWin(value: number, limit: number, typeSort: SortWinner, order: SortOrderWinner): Promise<Winner[]> {
    return ApiService.sort(`${Path.Winners}?_page=${value}&_limit=${limit}&_sort=${typeSort}&_order=${order}`);
  }
}
