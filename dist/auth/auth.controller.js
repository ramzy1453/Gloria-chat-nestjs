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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const config_1 = require("@nestjs/config");
const dectorators_1 = require("./dectorators");
const interceptors_1 = require("../interceptors");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService, config) {
        this.authService = authService;
        this.config = config;
    }
    async register(body, cookie, file) {
        console.log('wtf', file);
        const { user, accessToken, refreshToken } = await this.authService.register(body, file);
        cookie.set(refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: parseInt(this.config.get('REFRESH_TOKEN_LIFETIME')),
        });
        return { ...user, accessToken };
    }
    async login(body, cookie) {
        const { user, accessToken, refreshToken } = await this.authService.login(body);
        cookie.set(refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: parseInt(this.config.get('REFRESH_TOKEN_LIFETIME')),
        });
        return { ...user, accessToken };
    }
    logout(cookie) {
        cookie.clear();
        return {
            message: 'Logout successful',
        };
    }
    async refresh(cookie) {
        console.log(cookie.get());
        if (!cookie.get()) {
            throw new common_1.NotFoundException('Refresh token not found');
        }
        const { userId } = await this.authService.verifyToken(cookie.get(), {
            isRefreshToken: true,
        });
        const accessToken = await this.authService.createToken({ userId });
        return { accessToken };
    }
};
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.MulterInterceptor),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, dectorators_1.Cookies)('refreshToken')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IRegister, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, dectorators_1.Cookies)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ILogin, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Delete)('logout'),
    __param(0, (0, dectorators_1.Cookies)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('refresh-token'),
    __param(0, (0, dectorators_1.Cookies)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map