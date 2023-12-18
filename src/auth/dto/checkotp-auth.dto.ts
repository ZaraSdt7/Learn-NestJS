import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  Length,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckOtpAuthDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'OTP to verify',
  })
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  mobile: string;
}
