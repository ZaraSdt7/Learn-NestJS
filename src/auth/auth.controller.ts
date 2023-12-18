import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SendOtpAuthDto } from './dto/getotp-auth.dto';
import { CheckOtpAuthDto } from './dto/checkotp-auth.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() registerAuthDto: SendOtpAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post()
  login(@Body() loginAuthDto: CheckOtpAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
