import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { RegisterStudentDto, StudentLoginDto } from './dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common';
import { StudentJwtAuthGuard } from '../auth/guards/student-jwt-auth.guard';

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

  @Get('profile')
  @Roles(Role.Student)
  @UseGuards(StudentJwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  async profile(@Request() req) {
    return req.user;
  }
}
