import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request, Response, CookieOptions } from 'express';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const response = ctx.switchToHttp().getResponse<Response>();

    const get = () => request.cookies?.[data];
    const set = <T>(value: T, cookieOptions: CookieOptions) => {
      response.cookie(data, value, cookieOptions);
    };
    const clear = () => {
      response.clearCookie(data);
    };

    type CookiesType = {
      get: typeof get;
      set: typeof set;
      clear: typeof clear;
    };
    return { get, set, clear } as CookiesType;
  },
);
