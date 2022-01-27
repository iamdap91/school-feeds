import { Body, Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { SchoolsService } from './schools.service';
import { ManagerJwtAuthGuard } from '../auth/guards/manager-jwt-auth.guard';
import { CreateSchoolDto } from './dto';
import { StudentJwtAuthGuard } from '../auth/guards/student-jwt-auth.guard';

@Controller('schools')
@ApiTags('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @UseGuards(ManagerJwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async createSchool(@Request() req, @Body() body: CreateSchoolDto) {
    return await this.schoolsService.createSchool(req?.user?.id, body);
  }

  @Get(':id/posts')
  @UseGuards(StudentJwtAuthGuard)
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiBearerAuth('JWT-auth')
  async getPosts(@Param('id') schoolId) {
    return await this.schoolsService.findPostsBySchoolId(schoolId);
  }
}
