import { IsNumberString, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: IsString,
    required: true,
    description: 'username',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    type: IsString,
    required: true,
    description: 'mobile',
  })
  @IsOptional()
  @IsNumberString()
  mobile?: string;
}
