import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  schoolId: number;

  @ApiProperty()
  content: string;
}
