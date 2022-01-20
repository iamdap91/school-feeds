import { Module } from '@nestjs/common';
import { ManagersModule } from './managers/managers.module';

@Module({
  imports: [ManagersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
