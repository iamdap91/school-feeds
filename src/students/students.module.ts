import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { jwtConstants } from '../auth/constants';
import { FollowRepository, StudentRepository } from '../models/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository, FollowRepository]),
    JwtModule.register({
      secret: jwtConstants.secret.student,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
