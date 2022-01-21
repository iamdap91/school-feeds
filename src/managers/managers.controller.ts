import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterManagerDto } from './dto';
import { ManagersService } from './managers.service';
import { ManagerAuthGuard } from '../auth/guards/manager-auth-guard.service';

@Controller('managers')
@ApiTags('managers')
export class ManagersController {
  constructor(private managersService: ManagersService) {}

  @Get(':id')
  findOne(@Param() param) {
    return param.id;
  }

  @Post()
  async register(@Body() body: RegisterManagerDto) {
    return await this.managersService.register(body);
  }

  @UseGuards(ManagerAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.managersService.login(req.user);
  }
}
