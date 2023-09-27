/// <reference types="multer" />
/// <reference types="node" />
import { PrismaService } from '../prisma/prisma.service';
import { IRoom } from './dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class RoomService {
    private prisma;
    private cloudinary;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    createRoom(name: string, adminId: string, file: Express.Multer.File | Buffer): Promise<{
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
    getRooms(userId: string, query?: Partial<IRoom>): Promise<({
        joinedUsers: (import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        picture: string;
        picturePublicId: string;
        adminId: string;
    }, unknown> & {})[]>;
    getRoom(id: string, userId: string): Promise<{
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
    getFirstRoom(userId: string): Promise<{
        isJoined: boolean;
        name: string;
        id: string;
        picture: string;
        picturePublicId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        adminId: string;
    }>;
    updateRoom(id: string, name: string, adminId: string, file: Express.Multer.File | Buffer): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        picture: string;
        picturePublicId: string;
        adminId: string;
    }, unknown> & {}>;
    deleteRoom(id: string, adminId: string): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        picture: string;
        picturePublicId: string;
        adminId: string;
    }, unknown> & {}>;
    joinRoom(id: string, userId: string): Promise<{
        username: string;
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
    leaveRoom(id: string, userId: string): Promise<{
        joinedUsers: (import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        picture: string;
        picturePublicId: string;
        adminId: string;
    }, unknown> & {}>;
}
