import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';


@Injectable()
export class AuthService {
  
  register(registerAuthDto: RegisterAuthDto) {
  }

  login(loginauthdto:LoginAuthDto) {

  }


}
