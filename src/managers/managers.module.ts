import { Module } from '@nestjs/common';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from '../models/entities';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
