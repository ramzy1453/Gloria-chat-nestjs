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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const multer_interceptor_1 = require("./../interceptors/multer.interceptor");
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const dectorators_1 = require("../auth/dectorators");
const guards_1 = require("../auth/guards");
const room_service_1 = require("./room.service");
let RoomController = exports.RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    getRooms(userId, query) {
        return this.roomService.getRooms(userId, query);
    }
    getFirstRoom(userId) {
        return this.roomService.getFirstRoom(userId);
    }
    getRoom(id, userId) {
        return this.roomService.getRoom(id, userId);
    }
    createRoom(body, userId, file) {
        console.log(body, userId);
        return this.roomService.createRoom(body.name, userId, file);
    }
    updateRoom(id, body, userId, file) {
        return this.roomService.updateRoom(id, body.name, userId, file);
    }
    deleteRoom(id, userId) {
        return this.roomService.deleteRoom(id, userId);
    }
    joinRoom(id, userId) {
        return this.roomService.joinRoom(id, userId);
    }
    leaveRoom(id, userId) {
        return this.roomService.leaveRoom(id, userId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, dectorators_1.GetUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Get)('first'),
    __param(0, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "getFirstRoom", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(multer_interceptor_1.MulterInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, dectorators_1.GetUser)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IRoom, String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UseInterceptors)(multer_interceptor_1.MulterInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, dectorators_1.GetUser)('id')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.IRoom, String, Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Post)('join/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "joinRoom", null);
__decorate([
    (0, common_1.Post)('leave/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "leaveRoom", null);
exports.RoomController = RoomController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map