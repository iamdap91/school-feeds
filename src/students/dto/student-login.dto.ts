import { ApiProperty } from '@nestjs/swagger';

export class StudentLoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
