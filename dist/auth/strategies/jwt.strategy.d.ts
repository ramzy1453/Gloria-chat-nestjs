import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService, config: ConfigService);
    validate(payload: JwtPayload): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: string;
        username: string;
        password: string;
        picture: string;
        picturePublicId: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
export {};
