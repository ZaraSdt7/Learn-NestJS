import { IsNotEmpty, IsNumberString, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: IsString,
    required: true,
    description: 'username',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    type: IsString,
    required: true,
    description: 'mobile',
  })
  @IsNotEmpty()
  @IsNumberString()
  mobile: string;
}
