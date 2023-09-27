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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let RoomService = exports.RoomService = class RoomService {
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
    }
    async createRoom(name, adminId, file) {
        console.log(file, ' x');
        try {
            const image = await this.cloudinary.uploadImage(file, 'rooms', 'gloria-chat-app');
            console.log(image, 'ok');
            console.log(image);
            const room = await this.prisma.room.create({
                data: {
                    name,
                    adminId,
                    picture: image.secure_url,
                    picturePublicId: image.public_id,
                },
                include: {
                    joinedUsers: true,
                },
            });
            await this.joinRoom(room.id, adminId);
            return {
                ...room,
                isJoined: true,
            };
        }
        catch (err) {
            console.log(err);
        }
    }
    async getRooms(userId, query) {
        const rooms = await this.prisma.room.findMany({
            where: query,
            include: {
                joinedUsers: true,
            },
        });
        rooms.forEach((room) => {
            room.isJoined = !!room.joinedUsers.find((user) => user.id === userId);
            console.log(!!room.joinedUsers.find((user) => user.id === userId));
        });
        return rooms;
    }
    async getRoom(id, userId) {
        const room = await this.prisma.room.findUnique({
            where: {
                id,
            },
            include: {
                joinedUsers: true,
            },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        const isJoined = await this.prisma.room.findUnique({
            where: {
                id,
                joinedUsers: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        return { ...room, isJoined: !!isJoined };
    }
    async getFirstRoom(userId) {
        const room = await this.prisma.room.findFirst();
        if (!room) {
            return null;
        }
        const isJoined = await this.prisma.room.findFirst({
            where: {
                joinedUsers: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        return { ...room, isJoined: !!isJoined };
    }
    async updateRoom(id, name, adminId, file) {
        const room = await this.prisma.room.findUnique({
            where: {
                id,
            },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.adminId !== adminId) {
            throw new common_1.BadRequestException("You can't update a room that you don't own");
        }
        const image = await this.cloudinary.updateImage(file, room.picture);
        const updatedRoom = await this.prisma.room.update({
            where: {
                id,
            },
            data: {
                name,
                picture: image.secure_url,
                picturePublicId: image.public_id,
            },
        });
        return updatedRoom;
    }
    async deleteRoom(id, adminId) {
        const room = await this.prisma.room.findUnique({
            where: {
                id,
            },
        });
        console.log({
            givenId: adminId,
            imuId: room.adminId,
            isEq: room.adminId === adminId,
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.adminId !== adminId) {
            console.log('colonisation');
            throw new common_1.BadRequestException("You can't delete a room that you don't own");
        }
        const deletedMessages = await this.prisma.message.deleteMany({
            where: {
                roomId: id,
            },
        });
        const deletedRoom = await this.prisma.room.delete({
            where: {
                id,
            },
        });
        await this.cloudinary.deleteImage(room.picturePublicId);
        return deletedRoom;
    }
    async joinRoom(id, userId) {
        const room = await this.prisma.room.findFirst({
            where: {
                id,
                joinedUsers: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        if (room) {
            throw new common_1.BadRequestException("You're already in the room");
        }
        const updatedRoom = await this.prisma.room.update({
            where: {
                id,
            },
            data: {
                joinedUsers: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: {
                joinedUsers: true,
            },
        });
        const { username } = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return { ...updatedRoom, username };
    }
    async leaveRoom(id, userId) {
        const room = await this.prisma.room.findFirst({
            where: {
                id,
                joinedUsers: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        if (!room) {
            throw new common_1.BadRequestException("You're not in the room");
        }
        const updatedRoom = await this.prisma.room.update({
            where: {
                id,
            },
            data: {
                joinedUsers: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
            include: {
                joinedUsers: true,
            },
        });
        return updatedRoom;
    }
};
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], RoomService);
//# sourceMappingURL=room.service.js.map