import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class SignupUser {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Insert fullname',
    example: 'zara sdt',
  })
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Insert username',
    example: 'zara_sdt72',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: String,
    description: 'Insert email',
    example: 'zara.sdt@gmail.com',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Insert mobile',
    example: '09377775210',
    // default: null,
  })
  @ValidateIf((o) => o.mobile !== null)
  @IsNotEmpty()
  @IsString()
  readonly mobile: string;

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
