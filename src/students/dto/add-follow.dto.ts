import { ApiProperty } from '@nestjs/swagger';

export class AddFollowDto {
  @ApiProperty()
  postId: string;
}
