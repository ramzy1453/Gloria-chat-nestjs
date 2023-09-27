/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtPayload, IRegister, ILogin } from './dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private cloudinary;
    private prisma;
    private jwt;
    private config;
    constructor(cloudinary: CloudinaryService, prisma: PrismaService, jwt: JwtService, config: ConfigService);
    register(body: IRegister, file: Express.Multer.File): Promise<{
        user: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
        accessToken: string;
        refreshToken: string;
    }>;
    login(body: ILogin): Promise<{
        user: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
        accessToken: string;
        refreshToken: string;
    }>;
    createToken(payload: JwtPayload, { isRefreshToken }?: {
        isRefreshToken?: boolean;
    }): Promise<string>;
    hashPassword(password: string): Promise<string>;
    verifyToken(token: string, { isRefreshToken }?: {
        isRefreshToken?: boolean;
    }): Promise<JwtPayload>;
}
