import { GetRepsConfig, RecordTypeOprions } from '../app/types';

class Loader {
  private baseLink: string;

  private options: RecordTypeOprions;

  constructor(baseLink: string, options: RecordTypeOprions) {
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

  public errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  protected makeUrl({ endpoint, options = {} }: GetRepsConfig): string {
    const urlOptions: RecordTypeOprions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  protected load(method: string, callback: <T>(data: T) => void, config: GetRepsConfig): void {
    fetch(this.makeUrl(config), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
