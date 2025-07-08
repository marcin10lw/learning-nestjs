import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000, () => {
    Logger.log(
      `🚀 Application is running on PORT: ${process.env.PORT ?? 3000}`,
    );
  });
}

bootstrap().catch((error) => {
  Logger.error('Error during application bootstrap:', error);
  process.exit(1);
});
