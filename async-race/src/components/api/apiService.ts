import { MethodsHTTP } from '../utils/types';

export class ApiService {
  private static baseUrl = 'http://127.0.0.1:3000/';

  private static async fetchRequest<T>(
    page: string,
    method: MethodsHTTP,
    body?: unknown,
    headers?: HeadersInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${page}`;
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers,
    });
    const data = await response.json();
    return data;
  }

  public static delete<T>(element: string): Promise<T> {
    return this.fetchRequest(element, 'DELETE');
  }

  public static get<T>(element: string): Promise<T> {
    return this.fetchRequest(element, 'GET');
  }

  public static post<T>(element: string, body: unknown, headers: HeadersInit): Promise<T> {
    return this.fetchRequest(element, 'POST', body, headers);
  }

  public static put<T>(element: string, body: unknown, headers: HeadersInit): Promise<T> {
    return this.fetchRequest(element, 'PUT', body, headers);
  }

  public static getPages<T>(element: string): Promise<T> {
    return this.fetchRequest(element, 'GET');
  }

  public static runEngine<T>(element: string): Promise<T> {
    return this.fetchRequest(element, 'PATCH');
  }
}
