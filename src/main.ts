import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MemberFilter } from './filters/member.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MemberFilter());
  await app.listen(3000);
}
bootstrap();
