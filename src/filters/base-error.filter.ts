// src/filters/base-error.filter.ts in @saihu/common
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseError } from '../dto/base-res.dto';
import { BaseResponseDto } from '../dto/base-res.dto';

@Catch(BaseError)
export class BaseErrorFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Map your BaseError code to an appropriate HTTP status code
    const statusCode = this.mapErrorCodeToHttpStatus(exception.code);

    // Return the response in your standard format
    response.status(statusCode).json({
      code: exception.code,
      msg: exception.message,
      data: exception.data,
    });
  }

  private mapErrorCodeToHttpStatus(errorCode: number): number {
    // Map your custom error codes to HTTP status codes
    switch (errorCode) {
      case BaseResponseDto.CODE_NOT_FOUND:
        return HttpStatus.NOT_FOUND;
      case BaseResponseDto.CODE_UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case BaseResponseDto.CODE_FORBIDDEN:
        return HttpStatus.FORBIDDEN;
      case BaseResponseDto.CODE_BAD_REQUEST:
        return HttpStatus.BAD_REQUEST;
      case BaseResponseDto.CODE_SERVER_ERROR:
        return HttpStatus.INTERNAL_SERVER_ERROR;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
