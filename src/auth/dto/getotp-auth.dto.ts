import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from '@nestjs/class-validator';

export class SendOtpAuthDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  mobile: string;
}
