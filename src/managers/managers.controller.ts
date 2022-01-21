import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterManagerDto } from './dto';
import { ManagersService } from './managers.service';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller('managers')
@ApiTags('managers')
export class ManagersController {
  constructor(private managersService: ManagersService, private authService: AuthService) {}

  @Get(':id')
  findOne(@Param() param) {
    return param.id;
  }

  @Post()
  async register(@Body() body: RegisterManagerDto) {
    return await this.managersService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
