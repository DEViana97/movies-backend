import { ApiResponse } from './response.interface';

export class ResponseUtil {
  static success<T>(status: number, data: T, message: string = 'Request successful'): ApiResponse<T> {
    return { status, message, data };
  }

  static error(status: number, message: string): ApiResponse<null> {
    return { status, message, data: null };
  }
}