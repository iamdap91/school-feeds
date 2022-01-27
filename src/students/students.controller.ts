import { Body, Controller, Get, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { ToggleFollowDto, RegisterStudentDto, StudentLoginDto } from './dto';
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
  @UseGuards(StudentJwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async profile(@Request() req) {
    return req.user;
  }

  @Put('follow')
  @UseGuards(StudentJwtAuthGuard)
  @ApiBody({})
  @ApiBearerAuth('JWT-auth')
  async toggleFollow(@Request() req, @Body() body: ToggleFollowDto) {
    return this.studentsService.toggleFollow(req.user.id, body);
  }

  @Get(':id/schools')
  @UseGuards(StudentJwtAuthGuard)
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiBearerAuth('JWT-auth')
  async getSchoolList(@Request() req) {
    return await this.studentsService.findSchoolList(req.user.id);
  }
}
