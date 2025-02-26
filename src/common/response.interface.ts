export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface LoginResponseData {
  access_token: string;
  user: {
    id: number;
    username: string;
  };
}