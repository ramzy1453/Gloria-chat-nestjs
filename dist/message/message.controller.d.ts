import { MessageService } from './message.service';
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    create(roomId: string, text: string, userId: string): Promise<{
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
    findOne(roomId: string, messageId: string): Promise<{
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
    update(roomId: string, messageId: string, text: string, userId: string): Promise<{
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
    remove(roomId: string, messageId: string, userId: string): Promise<{
        message: string;
    }>;
}
