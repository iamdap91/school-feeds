import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { ManagerJwtStrategy } from './strategies/manager-jwt.strategy';
import { ManagerStrategy } from './strategies/manager.strategy';
import { ManagersModule } from '../managers/managers.module';

@Module({
  imports: [
    ManagersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [ManagerStrategy, ManagerJwtStrategy],
  exports: [],
})
export class AuthModule {}
