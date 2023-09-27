"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
class AuthJwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    handleRequest(err, user, info) {
        if (err || !user) {
            throw new common_1.UnauthorizedException('Missing or invalid token');
        }
        return user;
    }
}
exports.AuthJwtGuard = AuthJwtGuard;
//# sourceMappingURL=auth-jwt.guard.js.map