import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export type ErrorCodesStatusMapping = {
  [key: string]: number;
};

@Catch(Prisma?.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  private errorCodesStatusMapping: ErrorCodesStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
    P2016: HttpStatus.BAD_REQUEST,
  };

  /**
   * @param applicationRef
   * @param errorCodesStatusMapping
   */
  constructor(
    applicationRef?: HttpServer,
    errorCodesStatusMapping?: ErrorCodesStatusMapping,
  ) {
    super(applicationRef);

    if (errorCodesStatusMapping) {
      this.errorCodesStatusMapping = Object.assign(
        this.errorCodesStatusMapping,
        errorCodesStatusMapping,
      );
    }
  }

  /**
   * @param exception
   * @param host
   * @returns
   */
  catch(
    exception: Prisma.PrismaClientKnownRequestError | any,
    host: ArgumentsHost,
  ) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.catchClientKnownRequestError(exception, host);
    }
  }

  private catchClientKnownRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    console.log(exception.code, exception.message);
    const statusCode = this.errorCodesStatusMapping[exception.code];
    const message = this.getExceptionMessage(exception);

    if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
      return super.catch(exception, host);
    }

    super.catch(new HttpException({ statusCode, message }, statusCode), host);
  }

  private catchNotFoundError(host: ArgumentsHost) {
    const statusCode = HttpStatus.NOT_FOUND;

    super.catch(new HttpException({ statusCode }, statusCode), host);
  }

  private getExceptionMessage(exception: Prisma.PrismaClientKnownRequestError) {
    const { meta, code } = exception;
    if (code === 'P2002') {
      // Unique constraint
      const field = meta?.target[0];
      return `The ${field} is already taken`;
    }
    if (code === 'P2025' || code === 'P2016') {
      const regex = /`([^`]*)`/g;
      const matches = exception.message.match(regex);
      const value = matches[0].replace(/`/g, '').split('.').at(-2);
      return `The ${value} is not found`;
    }

    if (code === 'P2000') {
      // Not found exception
      return "The provided value for the column is too long for the column's type";
    }
  }
}
