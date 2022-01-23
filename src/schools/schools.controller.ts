import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SchoolsService } from './schools.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSchoolDto } from './dto';

@Controller('schools')
@ApiTags('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async createSchool(@Request() req, @Body() body: CreateSchoolDto) {
    return await this.schoolsService.createSchool(req?.user?.id, body);
  }
}
