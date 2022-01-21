import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterManagerDto } from './dto';
import { ManagersService } from './managers.service';

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
}
