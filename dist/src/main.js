"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const global_config_1 = require("./global-config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('FIAP - Fase 5: Hackaton')
        .setDescription('Video Processing')
        .setVersion('1.0')
        .addBearerAuth({
        description: 'Informar token JWT para autorizar o acesso',
        name: 'Authorization',
        scheme: 'bearer',
        type: 'http',
        in: 'header',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    (0, global_config_1.applyGlobalConfig)(app);
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map