import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { StudentsService } from '../../students/students.service';

@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy) {
  constructor(private studentsService: StudentsService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const account = await this.studentsService.validateUser(email, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
