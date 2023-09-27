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
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
let PrismaExceptionFilter = exports.PrismaExceptionFilter = class PrismaExceptionFilter extends core_1.BaseExceptionFilter {
    constructor(applicationRef, errorCodesStatusMapping) {
        super(applicationRef);
        this.errorCodesStatusMapping = {
            P2000: common_1.HttpStatus.BAD_REQUEST,
            P2002: common_1.HttpStatus.CONFLICT,
            P2025: common_1.HttpStatus.NOT_FOUND,
            P2016: common_1.HttpStatus.BAD_REQUEST,
        };
        if (errorCodesStatusMapping) {
            this.errorCodesStatusMapping = Object.assign(this.errorCodesStatusMapping, errorCodesStatusMapping);
        }
    }
    catch(exception, host) {
        if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return this.catchClientKnownRequestError(exception, host);
        }
    }
    catchClientKnownRequestError(exception, host) {
        console.log(exception.code, exception.message);
        const statusCode = this.errorCodesStatusMapping[exception.code];
        const message = this.getExceptionMessage(exception);
        if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
            return super.catch(exception, host);
        }
        super.catch(new common_1.HttpException({ statusCode, message }, statusCode), host);
    }
    catchNotFoundError(host) {
        const statusCode = common_1.HttpStatus.NOT_FOUND;
        super.catch(new common_1.HttpException({ statusCode }, statusCode), host);
    }
    getExceptionMessage(exception) {
        const { meta, code } = exception;
        if (code === 'P2002') {
            const field = meta?.target[0];
            return `The ${field} is already taken`;
        }
        if (code === 'P2025' || code === 'P2016') {
            const regex = /`([^`]*)`/g;
            const matches = exception.message.match(regex);
            const value = matches[0].replace(/`/g, '').split('.').at(-2);
            return `The ${value} is not found`;
        }
        if (code === 'P2000') {
            return "The provided value for the column is too long for the column's type";
        }
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma?.PrismaClientKnownRequestError),
    __metadata("design:paramtypes", [Object, Object])
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map