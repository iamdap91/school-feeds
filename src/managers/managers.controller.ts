import { Controller, Get } from '@nestjs/common';

@Controller('managers')
export class ManagersController {
  @Get()
  async findOne() {
    return 'find one';
  }
}
