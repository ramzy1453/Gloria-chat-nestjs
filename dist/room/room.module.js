"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const room_gateway_1 = require("../room/room.gateway");
const room_controller_1 = require("./room.controller");
let RoomModule = exports.RoomModule = class RoomModule {
};
exports.RoomModule = RoomModule = __decorate([
    (0, common_1.Module)({
        controllers: [room_controller_1.RoomController],
        providers: [room_service_1.RoomService, room_gateway_1.RoomGateway],
    })
], RoomModule);
//# sourceMappingURL=room.module.js.map