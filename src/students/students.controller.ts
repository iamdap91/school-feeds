import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { StudentJwtStrategy } from '../auth/strategies/student-jwt.strategy';
import { RegisterStudentDto, StudentLoginDto } from './dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  async register(@Body() body: RegisterStudentDto) {
    return await this.studentsService.register(body);
  }

  @Post('login')
  async login(@Body() body: StudentLoginDto) {
    const user = await this.studentsService.validateUser(body);
    if (!user) throw new UnauthorizedException();
    return this.studentsService.login(user);
  }

  @UseGuards(StudentJwtStrategy)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
