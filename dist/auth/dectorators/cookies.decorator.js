"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookies = void 0;
const common_1 = require("@nestjs/common");
exports.Cookies = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const response = ctx.switchToHttp().getResponse();
    const get = () => request.cookies?.[data];
    const set = (value, cookieOptions) => {
        response.cookie(data, value, cookieOptions);
    };
    const clear = () => {
        response.clearCookie(data);
    };
    return { get, set, clear };
});
//# sourceMappingURL=cookies.decorator.js.map