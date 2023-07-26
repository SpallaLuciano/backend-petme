import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { CatchableExceptionFilter } from './common';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: process.env.FRONT_HOST,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new CatchableExceptionFilter());

  if (process.env.NODE_ENV === 'development') {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('PetMe Backend')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('docs', app, document);
  }

  app.enableShutdownHooks();
  const server = await app.listen(process.env.PORT || 3000);

  app.getUrl().then((value) => console.log(value));

  process.stdin.resume();
  const handleTermination = () => {
    server.close((err) => {
      console.error('Closing server');
      if (err) {
        process.exitCode = 1;
      }
      process.exit();
    });
  };

  process.on('SIGINT', handleTermination);
  process.on('SIGTERM', handleTermination);
}
bootstrap();
