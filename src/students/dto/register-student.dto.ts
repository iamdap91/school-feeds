import { ApiProperty } from '@nestjs/swagger';

export class RegisterStudentDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;
}
