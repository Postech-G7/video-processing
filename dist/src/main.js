"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const global_config_1 = require("./global-config");
const swagger_1 = require("@nestjs/swagger");
const multipart_1 = __importDefault(require("@fastify/multipart"));
async function bootstrap() {
    const fastifyAdapter = new platform_fastify_1.FastifyAdapter({
        logger: true,
    });
    await fastifyAdapter.register(multipart_1.default, {
        limits: {
            fileSize: 50 * 1024 * 1024,
        },
        addToBody: false,
        attachFieldsToBody: false,
        throwFileSizeLimit: true,
        sharedSchemaId: '#mySharedSchema',
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, fastifyAdapter);
    app.enableCors();
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
    const port = process.env.PORT || 8080;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map