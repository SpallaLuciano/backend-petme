export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export interface Response<T> {
  data: T;
  status: ResponseStatus;
}

export function successResponse<T>(data: T): Response<T> {
  return {
    status: ResponseStatus.SUCCESS,
    data,
  };
}
