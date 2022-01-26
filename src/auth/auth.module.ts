import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ManagerJwtStrategy } from './strategies/manager-jwt.strategy';
import { ManagersModule } from '../managers/managers.module';
import { StudentJwtStrategy } from './strategies/student-jwt.strategy';

@Module({
  imports: [ManagersModule, PassportModule],
  providers: [ManagerJwtStrategy, StudentJwtStrategy],
  exports: [],
})
export class AuthModule {}
