import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  IsString,
  MaxLength,
  IsMongoId,
  IsOptional,
} from 'class-validator';
export class UpdateBlogDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'the title of blog',
    example: 'About roadmap backend',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'the description of blog',
    example: 'description backend',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'the content of blog',
    example: 'About  backend nestjs',
  })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsMongoId()
  author: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  category: string;
}
