import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ManagerJwtStrategy } from './strategies/manager-jwt.strategy';
import { ManagersModule } from '../managers/managers.module';

@Module({
  imports: [ManagersModule, PassportModule],
  providers: [ManagerJwtStrategy],
  exports: [],
})
export class AuthModule {}
