"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterInterceptor = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
exports.MulterInterceptor = (0, platform_express_1.FileInterceptor)('image', {
    storage: (0, multer_1.memoryStorage)(),
});
//# sourceMappingURL=multer.interceptor.js.map