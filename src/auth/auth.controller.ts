import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupUser } from './dto/signup-auth.dto';
import { LoginUser } from './dto/login-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('SignUp')
  SignUp(@Body() signupdto: SignupUser) {
    return this.authService.signup(signupdto);
  }

  @Post('Login')
  Login(@Body() logindto: LoginUser) {
    return this.authService.login(logindto);
  }
}
