/// <reference types="multer" />
import { UserService } from './user.service';
import { IUser } from './dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(query: Partial<IUser>): Promise<({
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
    getJoinedRooms(userId: string): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        picture: string;
        picturePublicId: string;
        adminId: string;
    }, unknown> & {})[]>;
    getCreatedRooms(userId: string): Promise<(import("@prisma/client/runtime/library").GetResult<{
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
    getCurrentUser(userId: string): Promise<{
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
}
