/// <reference types="node" />
import { NestMiddleware } from '@nestjs/common';
export declare class MorganMiddleware implements NestMiddleware {
    constructor();
    resolve(): (req: import("http").IncomingMessage, res: import("http").ServerResponse<import("http").IncomingMessage>, callback: (err?: Error) => void) => void;
    use(req: any, res: any, next: (error?: any) => void): void;
}
