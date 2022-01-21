import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
}
