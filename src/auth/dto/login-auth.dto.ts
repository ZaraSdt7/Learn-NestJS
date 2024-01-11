import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { IsNotEmpty } from '@nestjs/class-validator';
export class LoginUser {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Insert username',
    example: 'zara_sdt77',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Insert password',
    example: '254sdds',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly password: string;
}
