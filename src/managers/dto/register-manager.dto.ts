import { ApiProperty } from '@nestjs/swagger';

export class RegisterManagerDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;
}
