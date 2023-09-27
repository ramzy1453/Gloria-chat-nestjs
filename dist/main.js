"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const filters_1 = require("./filters");
const morgan = require("morgan");
const siofu = require("socketio-file-upload");
async function runApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix('api/v1');
    app.enableCors({ origin: '*' });
    app.use([cookieParser(), morgan('tiny'), siofu.router]);
    app.useGlobalFilters(new filters_1.PrismaExceptionFilter(app.getHttpAdapter()));
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    await app.listen(8000);
}
runApp();
//# sourceMappingURL=main.js.map