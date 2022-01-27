import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity, SchoolEntity } from '../models/entities';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity, PostEntity])],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
