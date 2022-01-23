import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ManagersModule } from '../managers/managers.module';

@Module({
  imports: [ManagersModule, PassportModule],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule {}
