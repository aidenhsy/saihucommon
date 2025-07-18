import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionResponse = exception.getResponse() as any;

    // Check if it's a validation error (has array of messages)
    if (exceptionResponse.message && Array.isArray(exceptionResponse.message)) {
      // Format validation errors in your BaseResponse format
      const errorResponse = {
        code: 400, // BaseResponseDto.CODE_BAD_REQUEST
        msg: exceptionResponse.message.join(', '),
        data: null,
      };

      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
    } else {
      // Handle other BadRequestExceptions
      const errorResponse = {
        code: 400,
        msg: exceptionResponse.message || 'Bad Request',
        data: null,
      };

      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
    }
  }
}
