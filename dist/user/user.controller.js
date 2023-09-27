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
exports.UserController = void 0;
const multer_interceptor_1 = require("./../interceptors/multer.interceptor");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const dectorators_1 = require("../auth/dectorators");
const guards_1 = require("../auth/guards");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll(query) {
        return this.userService.findAll(query);
    }
    getJoinedRooms(userId) {
        return this.userService.getJoinedRooms(userId);
    }
    getCreatedRooms(userId) {
        return this.userService.getCreatedRooms(userId);
    }
    isInRoom(userId, roomId) {
        return this.userService.isInRoom(userId, roomId);
    }
    getCurrentUser(userId) {
        return this.userService.findOne(userId);
    }
    update(id, body, file) {
        return this.userService.update(id, body, file);
    }
    remove(id) {
        return this.userService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Get)('joined-rooms'),
    __param(0, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getJoinedRooms", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Get)('created-rooms'),
    __param(0, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getCreatedRooms", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Get)('is-in-room/:roomId'),
    __param(0, (0, dectorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "isInRoom", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Get)('account'),
    __param(0, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.UseInterceptors)(multer_interceptor_1.MulterInterceptor),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map