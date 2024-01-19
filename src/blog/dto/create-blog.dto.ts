import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'the title of blog',
    example: 'About roadmap backend',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'the description of blog',
    example: 'description backend',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'the content of blog',
    example: 'About  backend nestjs',
  })
  @IsNotEmpty()
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
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  category: string;
}
