/* eslint-disable prettier/prettier */
export type IResponse<T, B> = {
  message: string;
  data?: T;
  error?: B;
};

export type IAuthResponse<T> = {
  message: string;
  accessToken: string;
  data?: T;
};
