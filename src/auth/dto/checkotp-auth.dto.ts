import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  Length,
} from '@nestjs/class-validator';

export class CheckOtpAuthDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  mobile: string;
}
