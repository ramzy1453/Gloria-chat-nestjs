/// <reference types="multer" />
import { AuthService } from './auth.service';
import { IRegister, ILogin, CookieType } from './dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private authService;
    private config;
    constructor(authService: AuthService, config: ConfigService);
    register(body: IRegister, cookie: CookieType, file: Express.Multer.File): Promise<{
        accessToken: string;
        username: string;
        password: string;
        id: string;
        picture: string;
        picturePublicId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(body: ILogin, cookie: CookieType): Promise<{
        accessToken: string;
        username: string;
        password: string;
        id: string;
        picture: string;
        picturePublicId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    logout(cookie: CookieType): {
        message: string;
    };
    refresh(cookie: CookieType): Promise<{
        accessToken: string;
    }>;
}
