import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentEntity } from '../models/entities';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity]),
    JwtModule.register({
      secret: jwtConstants.secret.manager,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
