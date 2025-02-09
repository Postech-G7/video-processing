import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { applyGlobalConfig } from './global-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyMultipart from '@fastify/multipart';


async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: true,
  });

  // Configure multipart for file uploads
  await fastifyAdapter.register(fastifyMultipart, {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB
    },
    addToBody: false,
    attachFieldsToBody: true,
    throwFileSizeLimit: true,
    sharedSchemaId: '#mySharedSchema',
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  app.enableCors();

  const config = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  applyGlobalConfig(app); //interceptors
  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
