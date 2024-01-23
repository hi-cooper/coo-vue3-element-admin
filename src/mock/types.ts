import type { IHttpApiResponse } from '@/api/HttpApi/types';

export interface IMockParam {
  url: string;
  method: string;
  response<T>(option?: Record<string, unknown>): IHttpApiResponse<T>;
}
