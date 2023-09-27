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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let UserService = exports.UserService = class UserService {
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
    }
    async findAll(query) {
        const users = await this.prisma.user.findMany({
            where: query,
            include: {
                joinedRooms: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        return users;
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                joinedRooms: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, body, file) {
        const { picturePublicId } = await this.prisma.user.findUnique({
            where: { id },
            select: { picturePublicId: true },
        });
        const image = await this.cloudinary.updateImage(file, picturePublicId);
        const user = await this.prisma.user.update({
            where: { id },
            data: {
                ...body,
                picture: image.secure_url,
                picturePublicId: image.public_id,
            },
        });
        return user;
    }
    async remove(id) {
        const user = await this.prisma.user.delete({
            where: {
                id,
            },
        });
        return {
            message: 'User deleted successfully',
        };
    }
    async getJoinedRooms(id) {
        const rooms = await this.prisma.room.findMany({
            where: {
                joinedUsers: {
                    some: {
                        id,
                    },
                },
            },
        });
        return rooms;
    }
    async getCreatedRooms(id) {
        console.log(id);
        const rooms = await this.prisma.room.findMany({
            where: {
                adminId: id,
            },
        });
        return rooms;
    }
    async isInRoom(userId, roomId) {
        const room = await this.prisma.room.findUnique({
            where: {
                id: roomId,
                joinedUsers: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                joinedUsers: true,
            },
        });
        if (!room)
            return {
                isJoined: false,
            };
        return { ...room, isJoined: true };
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], UserService);
//# sourceMappingURL=user.service.js.map