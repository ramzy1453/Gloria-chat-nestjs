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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
let AuthService = exports.AuthService = class AuthService {
    constructor(cloudinary, prisma, jwt, config) {
        this.cloudinary = cloudinary;
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async register(body, file) {
        const { username, password, confirmPassword } = body;
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException('Password and confirmation password do not match');
        }
        const hashedPassword = await this.hashPassword(password);
        const image = await this.cloudinary.uploadImage(file, 'users', 'gloria-chat-app');
        const user = await this.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                picture: image.secure_url,
                picturePublicId: image.public_id,
            },
        });
        const accessToken = await this.createToken({ userId: user.id });
        const refreshToken = await this.createToken({ userId: user.id }, { isRefreshToken: true });
        user.password = undefined;
        return { user, accessToken, refreshToken };
    }
    async login(body) {
        const { username, password } = body;
        const user = await this.prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.NotFoundException('Invalid password');
        }
        const accessToken = await this.createToken({ userId: user.id });
        const refreshToken = await this.createToken({ userId: user.id }, { isRefreshToken: true });
        user.password = undefined;
        return { user, accessToken, refreshToken };
    }
    async createToken(payload, { isRefreshToken = false } = {}) {
        const tokenType = isRefreshToken ? 'REFRESH_TOKEN_' : 'ACCESS_TOKEN_';
        const token = this.jwt.signAsync(payload, {
            secret: this.config.get(tokenType + 'SECRET'),
            expiresIn: parseInt(this.config.get(tokenType + 'LIFETIME')),
        });
        return token;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    async verifyToken(token, { isRefreshToken = false } = {}) {
        if (!token) {
            throw new common_1.UnauthorizedException('Missing or invalid token');
        }
        const tokenType = isRefreshToken ? 'REFRESH_TOKEN_' : 'ACCESS_TOKEN_';
        const payload = await this.jwt.verifyAsync(token, {
            secret: this.config.get(tokenType + 'SECRET'),
        });
        if (!payload) {
            throw new common_1.UnauthorizedException('Missing or invalid token');
        }
        return payload;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map