/// <reference types="multer" />
import { IRoom } from './dto';
import { RoomService } from './room.service';
export declare class RoomController {
    private roomService;
    constructor(roomService: RoomService);
    getRooms(userId: string, query: Partial<IRoom>): Promise<({
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
    createRoom(body: IRoom, userId: string, file: Express.Multer.File): Promise<{
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
    updateRoom(id: string, body: IRoom, userId: string, file: Express.Multer.File): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        picture: string;
        picturePublicId: string;
        adminId: string;
    }, unknown> & {}>;
    deleteRoom(id: string, userId: string): Promise<import("@prisma/client/runtime/library").GetResult<{
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
