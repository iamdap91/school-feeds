import { ApiProperty } from '@nestjs/swagger';

export class ToggleFollowDto {
  @ApiProperty()
  schoolId: number;
}
