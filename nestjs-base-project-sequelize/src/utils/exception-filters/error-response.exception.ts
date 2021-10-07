import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(
    statusCode: number,
    error: string,
    message: string[] = [],
    httpStatus: HttpStatus = HttpStatus.NOT_FOUND,
  ) {
    super({ statusCode, error, message }, httpStatus);
  }
}
