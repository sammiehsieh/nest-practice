import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [TaskModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
