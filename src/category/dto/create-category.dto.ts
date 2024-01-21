import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'the title of category',
    example: 'backends',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The parent of category',
    type: String,
    default: null,
  })
  @IsOptional()
  @IsMongoId()
  parent: string;
}
