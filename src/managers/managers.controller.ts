import { Body, Controller, Post, UseGuards, Request, Get, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoginDto, RegisterManagerDto } from './dto';
import { ManagersService } from './managers.service';
import { ManagerJwtAuthGuard } from '../auth/guards/manager-jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common';

@Controller('managers')
@ApiTags('managers')
export class ManagersController {
  constructor(private managersService: ManagersService) {}

  @Post()
  async register(@Body() body: RegisterManagerDto) {
    return await this.managersService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.managersService.validateUser(body);
    if (!user) throw new UnauthorizedException();
    return this.managersService.login(user);
  }

  @Get('profile')
  @Roles(Role.Manager)
  @UseGuards(ManagerJwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  async profile(@Request() req) {
    return req.user;
  }
}
