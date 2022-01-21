import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { StudentAuthGuard } from '../auth/guards/student-auth-guard.service';
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

  @UseGuards(StudentAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() body: StudentLoginDto) {
    return this.studentsService.login(req.user);
  }

  @UseGuards(StudentJwtStrategy)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
