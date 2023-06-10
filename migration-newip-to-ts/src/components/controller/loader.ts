import { GetRepsConfig, RecordTypeOptions } from '../app/types';

class Loader {
  constructor(private baseLink: string, private options: RecordTypeOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp(
    config: GetRepsConfig,
    callback = (): void => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load('GET', callback, config);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  private makeUrl({ endpoint, options = {} }: GetRepsConfig): string {
    const urlOptions: RecordTypeOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: string, callback: <T>(data: T) => void, config: GetRepsConfig): void {
    fetch(this.makeUrl(config), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then(<T>(data: T) => callback(data))
      .catch((err: string) => console.error(err));
  }
}

export default Loader;
