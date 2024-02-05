import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Frist comment....',
    description: ' user Comment....',
  })
  text: string;
}
