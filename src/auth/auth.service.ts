import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/getotp-auth.dto';
import { LoginAuthDto } from './dto/checkotp-auth.dto';

@Injectable()
export class AuthService {
  register(registerAuthDto: RegisterAuthDto) {}

  login(loginauthdto: LoginAuthDto) {}
}
