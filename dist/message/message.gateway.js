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
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const message_service_1 = require("./message.service");
const auth_service_1 = require("../auth/auth.service");
let MessageGateway = exports.MessageGateway = class MessageGateway {
    constructor(messageService, authService) {
        this.messageService = messageService;
        this.authService = authService;
    }
    afterInit(server) { }
    handleConnection(client, ...args) { }
    handleDisconnect(client) { }
    async create(client, [text, accessToken, roomId]) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const message = await this.messageService.create(text, roomId, userId);
        this.server.emit('create-message', message);
    }
    async delete(client, [messageId, accessToken, roomId]) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const message = await this.messageService.remove(roomId, userId, messageId);
        this.server.to(roomId).emit('delete-message', message);
    }
    async update(client, [messageId, text, accessToken, roomId]) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const message = await this.messageService.update(roomId, userId, messageId, text);
        this.server.to(roomId).emit('update-message', message);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('create-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('delete-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "delete", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('update-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Array]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "update", null);
exports.MessageGateway = MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        auth_service_1.AuthService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map