import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ManagersService } from '../../managers/managers.service';

@Injectable()
export class ManagerStrategy extends PassportStrategy(Strategy) {
  constructor(private managersService: ManagersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const account = await this.managersService.validateUser(email, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
