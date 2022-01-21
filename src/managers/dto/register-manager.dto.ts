import { ApiProperty } from '@nestjs/swagger';

export class RegisterManagerDto {
  @ApiProperty()
  name: string;
}
