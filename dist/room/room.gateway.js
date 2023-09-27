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
exports.RoomGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const room_service_1 = require("./room.service");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
let RoomGateway = exports.RoomGateway = class RoomGateway {
    constructor(roomService, authService) {
        this.roomService = roomService;
        this.authService = authService;
    }
    afterInit(server) { }
    handleConnection(client, ...args) { }
    handleDisconnect(client) { }
    async createRoom(client, [name, description, accessToken, image]) {
        console.log('nkc', image);
        const { userId } = await this.authService.verifyToken(accessToken);
        const room = await this.roomService.createRoom(name, userId, image);
        client.join(room.id);
        this.server.emit('create-room', room);
    }
    async deleteRoom(client, [roomId, accessToken]) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const room = await this.roomService.deleteRoom(roomId, userId);
        client.leave(room.id);
        this.server.emit('delete-room', room);
    }
    async updateRoom(client, [roomId, name, accessToken]) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const image = {};
        const room = await this.roomService.updateRoom(roomId, name, userId, image);
        this.server.emit('update-room', room);
    }
    async joinRoom(client, [roomId, accessToken]) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const room = await this.roomService.joinRoom(roomId, userId);
        client.join(room.id);
        this.server.emit('join-room', room);
    }
    async leaveRoom(client, [roomId, accessToken]) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const room = await this.roomService.leaveRoom(roomId, userId);
        client.leave(room.id);
        this.server.emit('leave-room', room);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('create-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "createRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('delete-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "deleteRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('update-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "updateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "leaveRoom", null);
exports.RoomGateway = RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        auth_service_1.AuthService])
], RoomGateway);
//# sourceMappingURL=room.gateway.js.map