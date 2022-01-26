import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Role } from '../../common';

@Injectable()
export class ManagerJwtStrategy extends PassportStrategy(Strategy, 'manager-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret.manager,
    });
  }

  async validate({ id, email, name, role }) {
    if (role !== Role.Manager) throw new UnauthorizedException();
    return { id, email, name, role: role === Role.Manager ? Role.Manager : Role.Student };
  }
}
