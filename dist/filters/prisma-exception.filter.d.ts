import { ArgumentsHost, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
export type ErrorCodesStatusMapping = {
    [key: string]: number;
};
export declare class PrismaExceptionFilter extends BaseExceptionFilter {
    private errorCodesStatusMapping;
    constructor(applicationRef?: HttpServer, errorCodesStatusMapping?: ErrorCodesStatusMapping);
    catch(exception: Prisma.PrismaClientKnownRequestError | any, host: ArgumentsHost): void;
    private catchClientKnownRequestError;
    private catchNotFoundError;
    private getExceptionMessage;
}
