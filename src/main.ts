import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppModule.PORT);
  console.log(`${AppModule.APP_NAME} is running in the port ${AppModule.PORT} 🚀`);
}
bootstrap();
