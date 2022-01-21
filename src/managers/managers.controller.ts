import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoginDto, RegisterManagerDto } from './dto';
import { ManagersService } from './managers.service';
import { ManagerAuthGuard } from '../auth/guards/manager-auth-guard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('managers')
@ApiTags('managers')
export class ManagersController {
  constructor(private managersService: ManagersService) {}

  @Post()
  async register(@Body() body: RegisterManagerDto) {
    return await this.managersService.register(body);
  }

  @UseGuards(ManagerAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() body: LoginDto) {
    return this.managersService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
