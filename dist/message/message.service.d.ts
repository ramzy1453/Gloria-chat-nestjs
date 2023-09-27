import { PrismaService } from '../prisma/prisma.service';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(text: string, roomId: string, userId: string): Promise<{
        user: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
        room: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            picture: string;
            picturePublicId: string;
            adminId: string;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
    }, unknown> & {}>;
    getLastMessage(roomId: string): Promise<({
        user: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
        room: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            picture: string;
            picturePublicId: string;
            adminId: string;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
    }, unknown> & {}) | {
        text: string;
    }>;
    findAllByRoomId(roomId: string, userId: string): Promise<({
        user: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
        room: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            picture: string;
            picturePublicId: string;
            adminId: string;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
    }, unknown> & {})[]>;
    findOne(roomId: string, id: string): Promise<{
        user: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
        room: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            picture: string;
            picturePublicId: string;
            adminId: string;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
    }, unknown> & {}>;
    update(roomId: string, userId: string, id: string, text: string): Promise<{
        user: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            username: string;
            password: string;
            picture: string;
            picturePublicId: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
        room: import("@prisma/client/runtime/library").GetResult<{
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            picture: string;
            picturePublicId: string;
            adminId: string;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: string;
        text: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        roomId: string;
    }, unknown> & {}>;
    remove(roomId: string, userId: string, id: string): Promise<{
        message: string;
    }>;
    isUserInRoom(userId: string, roomId: string): Promise<boolean>;
    isYourMessage(userId: string, id: string): Promise<boolean>;
}
