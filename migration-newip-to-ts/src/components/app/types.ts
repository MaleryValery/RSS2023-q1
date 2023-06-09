export type RecordTypeOprions = Record<string, string>;

export type GetRepsConfig = {
  endpoint: string;
  options?: {
    sourse?: string;
  };
};

export type Sourses = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};
