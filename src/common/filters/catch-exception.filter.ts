import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CatchableException } from '../errors/error';

@Catch(CatchableException)
export class CatchableExceptionFilter implements ExceptionFilter {
  catch({ status, message }: CatchableException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.OK).json({
      status,
      message,
    });
  }
}
