import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from '../models/entities';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity]), AuthModule],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
