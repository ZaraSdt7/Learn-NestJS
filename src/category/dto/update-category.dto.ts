import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'the title of category',
    example: 'backends',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The parent of category',
    type: String,
    example: '64a01b1f0d95ead9c8ea82b6',
  })
  @IsOptional()
  @IsMongoId()
  parent: string;
}
