// src/dto/base-response.dto.ts
export class BaseResponseDto<T> {
  code: number;
  msg: string;
  data: T | null;

  constructor(code: number, msg: string, data: T | null = null) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  static success<T>(data: T): BaseResponseDto<T> {
    return new BaseResponseDto<T>(0, 'success', data);
  }

  static successWithMessage<T>(msg: string, data: T): BaseResponseDto<T> {
    return new BaseResponseDto<T>(0, msg, data);
  }

  static error<T>(code: number, msg: string): BaseResponseDto<T> {
    return new BaseResponseDto<T>(code, msg, null);
  }

  // Common error codes
  static readonly CODE_NOT_FOUND = 404;
  static readonly CODE_UNAUTHORIZED = 401;
  static readonly CODE_FORBIDDEN = 403;
  static readonly CODE_BAD_REQUEST = 400;
  static readonly CODE_SERVER_ERROR = 500;
}

/**
 * BaseError - A throwable error that contains BaseResponseDto information
 */
export class BaseError extends Error {
  code: number;
  data: any | null;

  constructor(code: number, message: string, data: any = null) {
    super(message);
    this.name = 'BaseError';
    this.code = code;
    this.data = data;
  }

  toResponse<T>(): BaseResponseDto<T> {
    return new BaseResponseDto<T>(this.code, this.message, this.data);
  }

  // Static methods for common errors
  static notFound(message = 'Resource not found'): BaseError {
    return new BaseError(BaseResponseDto.CODE_NOT_FOUND, message);
  }

  static unauthorized(message = 'Unauthorized'): BaseError {
    return new BaseError(BaseResponseDto.CODE_UNAUTHORIZED, message);
  }

  static forbidden(message = 'Forbidden'): BaseError {
    return new BaseError(BaseResponseDto.CODE_FORBIDDEN, message);
  }

  static badRequest(message = 'Bad request'): BaseError {
    return new BaseError(BaseResponseDto.CODE_BAD_REQUEST, message);
  }

  static serverError(message = 'Internal server error'): BaseError {
    return new BaseError(BaseResponseDto.CODE_SERVER_ERROR, message);
  }
}
