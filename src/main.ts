import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform:true
    })
  );
  //cors
  app.enableCors();

  // Swagger config
  const config = new DocumentBuilder()
        .setTitle("API For Todo")
        .setDescription("Description")
        .setVersion('1.0')
        .addTag('todos')
        .addBearerAuth() //Pour JWT
        .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs',app, document); // URL: http://localhost:3000/api/docs
  await app.listen(process.env.PORT ?? 3000);

  console.log('app started on : http://localhost:3000')
  console.log('app Documentation Swagger is on : http://localhost:3000/api/docs')
}
bootstrap();
