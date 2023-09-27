"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MessageService = exports.MessageService = class MessageService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(text, roomId, userId) {
        if (!(await this.isUserInRoom(userId, roomId))) {
            console.log('Roi  f');
            throw new common_1.NotFoundException('User is not in room');
        }
        const message = await this.prisma.message.create({
            data: {
                text,
                room: {
                    connect: {
                        id: roomId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: {
                user: true,
                room: true,
            },
        });
        return message;
    }
    async getLastMessage(roomId) {
        const message = await this.prisma.message.findFirst({
            where: {
                roomId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: true,
                room: true,
            },
        });
        if (!message) {
            return {
                text: 'Start conversation',
            };
        }
        return message;
    }
    async findAllByRoomId(roomId, userId) {
        if (!(await this.isUserInRoom(userId, roomId))) {
            console.log('Roi du one piece');
            throw new common_1.UnauthorizedException('User is not in room');
        }
        console.log('ok');
        const messages = await this.prisma.message.findMany({
            where: {
                roomId,
            },
            include: {
                user: true,
                room: true,
            },
        });
        return messages;
    }
    async findOne(roomId, id) {
        const message = await this.prisma.message.findUnique({
            where: {
                id,
                roomId,
            },
            include: {
                user: true,
                room: true,
            },
        });
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        return message;
    }
    async update(roomId, userId, id, text) {
        if (!(await this.isUserInRoom(userId, roomId))) {
            throw new common_1.UnauthorizedException('User is not in room');
        }
        if (!(await this.isYourMessage(userId, id))) {
            throw new common_1.UnauthorizedException('You can not edit this message');
        }
        const updatedMessage = await this.prisma.message.update({
            where: {
                id,
                roomId,
            },
            data: {
                text,
            },
            include: {
                user: true,
                room: true,
            },
        });
        return updatedMessage;
    }
    async remove(roomId, userId, id) {
        if (!this.isUserInRoom(userId, roomId)) {
            throw new common_1.UnauthorizedException('User is not in room');
        }
        if (!this.isYourMessage(userId, id)) {
            throw new common_1.UnauthorizedException('You can not delete this message');
        }
        const deletedMessage = await this.prisma.message.delete({
            where: {
                id,
                roomId,
            },
        });
        return {
            message: 'Message deleted',
        };
    }
    async isUserInRoom(userId, roomId) {
        const room = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                joinedUsers: {
                    where: {
                        id: userId,
                    },
                },
            },
        });
        console.log(room.joinedUsers.length > 0);
        return room.joinedUsers.length > 0;
    }
    async isYourMessage(userId, id) {
        const message = await this.prisma.message.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
        return message.user.id === userId;
    }
};
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessageService);
//# sourceMappingURL=message.service.js.map