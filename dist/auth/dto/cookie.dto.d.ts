import { CookieOptions } from 'express';
export type CookieType = {
    get: () => string;
    set: <T>(value: T, cookieOptions: CookieOptions) => void;
    clear: () => void;
};
