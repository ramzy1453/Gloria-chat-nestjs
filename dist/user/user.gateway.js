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
exports.UserGateway = void 0;
const user_service_1 = require("./user.service");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
let UserGateway = exports.UserGateway = class UserGateway {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    afterInit(server) { }
    handleConnection(client, ...args) { }
    handleDisconnect(client) { }
    async updateUser(client, accessToken) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const user = await this.userService.findOne(userId);
        this.server.emit('update-user', user);
    }
    async deleteUser(client, accessToken) {
        const { userId } = await this.authService.verifyToken(accessToken);
        const user = await this.userService.remove(userId);
        this.server.emit('delete-user', user);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('update-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "updateUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('delete-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "deleteUser", null);
exports.UserGateway = UserGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map