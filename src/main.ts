import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const globalPrefix = 'api';
  const documentPrefix = 'api-doc';
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder().setTitle('classting-assignment').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port);

  console.log(`api : http://localhost:${port}/${globalPrefix}  api-doc : http://localhost:${port}/${documentPrefix}`);
}
bootstrap();
