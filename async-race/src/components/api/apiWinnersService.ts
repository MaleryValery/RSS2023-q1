import { CreateWinner, IPathPagination, Path, SetWinner, SortOrderWinner, SortWinner, Winner } from '../utils/types';
import { ApiService } from './apiService';

export class ApiWinnersService {
  public static getAllWin(): Promise<Winner[]> {
    return ApiService.get(Path.winners);
  }

  public static createWin(transfer: CreateWinner, headers: HeadersInit): Promise<Winner> {
    return ApiService.post(Path.winners, transfer, headers);
  }

  public static getWin(idCar: number): Promise<Winner> {
    return ApiService.get(`${Path.winners}/${idCar}`);
  }

  public static deleteWin(idCar: number): Promise<void> {
    return ApiService.delete(`${Path.winners}/${idCar}`);
  }

  public static updateWin(idCar: number, transfer: SetWinner, headers: HeadersInit): Promise<Winner> {
    return ApiService.put(`${Path.winners}/${idCar}`, transfer, headers);
  }

  public static getPagination(value: number, limit: IPathPagination): Promise<Winner[]> {
    return ApiService.getPages(`${Path.winners}?_page=${value}&${limit.key}=${limit.value}`);
  }

  public static sortWin(
    value: number,
    limit: IPathPagination,
    typeSort: SortWinner,
    order: SortOrderWinner,
  ): Promise<Winner[]> {
    return ApiService.sort(
      `${Path.winners}?_page=${value}&${limit.key}=${limit.value}&_sort=${typeSort}&_order=${order}`,
    );
  }
}
