import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from '../models/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity])],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
