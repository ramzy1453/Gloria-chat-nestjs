/// <reference types="multer" />
import { IUser } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UserService {
    private prisma;
    private cloudinary;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    findAll(query?: Partial<IUser>): Promise<({
        joinedRooms: {
            id: string;
        }[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        username: string;
        password: string;
        picture: string;
        picturePublicId: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: string): Promise<{
        joinedRooms: {
            id: string;
        }[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        username: string;
        password: string;
        picture: string;
        picturePublicId: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: string, body: Partial<IUser>, file: Express.Multer.File): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: string;
        username: string;
        password: string;
        picture: string;
        picturePublicId: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getJoinedRooms(id: string): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        picture: string;
        picturePublicId: string;
        adminId: string;
    }, unknown> & {})[]>;
    getCreatedRooms(id: string): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        picture: string;
        picturePublicId: string;
        adminId: string;
    }, unknown> & {})[]>;
    isInRoom(userId: string, roomId: string): Promise<{
        isJoined: boolean;
    } | {
        isJoined: boolean;
        joinedUsers: (import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        name: string;
        id: string;
        picture: string;
        picturePublicId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        adminId: string;
    }>;
}
