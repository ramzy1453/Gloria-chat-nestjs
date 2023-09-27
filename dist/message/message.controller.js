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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../auth/guards");
const message_service_1 = require("./message.service");
const dectorators_1 = require("../auth/dectorators");
let MessageController = exports.MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    create(roomId, text, userId) {
        console.log(roomId);
        return this.messageService.create(text, roomId, userId);
    }
    findAllByRoomId(roomId, userId) {
        return this.messageService.findAllByRoomId(roomId, userId);
    }
    getLastMessage(roomId) {
        return this.messageService.getLastMessage(roomId);
    }
    findOne(roomId, messageId) {
        return this.messageService.findOne(roomId, messageId);
    }
    update(roomId, messageId, text, userId) {
        return this.messageService.update(roomId, userId, messageId, text);
    }
    remove(roomId, messageId, userId) {
        return this.messageService.remove(roomId, userId, messageId);
    }
};
__decorate([
    (0, common_1.Post)(':roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)('text')),
    __param(2, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Get)(':roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "findAllByRoomId", null);
__decorate([
    (0, common_1.Get)(':roomId/last-message'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "getLastMessage", null);
__decorate([
    (0, common_1.Get)(':roomId/:messageId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Param)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':roomId/:messageId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Param)('messageId')),
    __param(2, (0, common_1.Body)('text')),
    __param(3, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':roomId/:messageId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Param)('messageId')),
    __param(2, (0, dectorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "remove", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthJwtGuard),
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map