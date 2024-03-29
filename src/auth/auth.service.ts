import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SignupUser } from './dto/signup-auth.dto';
import { ResponseFormat } from 'src/shared/interfaces/response.interface';
import { ResponseMessages } from 'src/shared/constants/response-messages.constant';
import { LoginUser } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private usermodel: Model<User>,
    private jwtservice: JwtService,
  ) {}

  async signup(signupdto: SignupUser): Promise<ResponseFormat<any>> {
    try {
      const { fullname, username, password, mobile } = signupdto;
      const existuser = await this.usermodel.findOne({ username });
      if (existuser) {
        throw new UnauthorizedException(
          ResponseMessages.USERNAME_ALREADY_EXISTED,
        );
      }
      const hashpassword = await bcrypt.hash(password, 10);
      const user = await this.usermodel.create({
        username,
        fullname,
        mobile,
        password: hashpassword,
      });
      const token = this.jwtservice.sign({ id: user._id });
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          accessToken: token,
          user,
        },
      };
    } catch (error) {
      throw error.message;
    }
  }

  async login(logindto: LoginUser): Promise<ResponseFormat<any>> {
    try {
      const { username, password } = logindto;
      const user = await this.usermodel.findOne({ username });
      if (!user) {
        throw new UnauthorizedException(
          ResponseMessages.INVALID_USERNAME_PASSWORD,
        );
      }
      const ispassword = await bcrypt.compare(password, user.password);
      if (!ispassword) {
        throw new UnauthorizedException(
          ResponseMessages.USERNAME_ALREADY_EXISTED,
        );
      }
      const token = this.jwtservice.sign({ id: user._id });
      return {
        statusCode: HttpStatus.OK,
        data: {
          accessToken: token,
          user,
        },
      };
    } catch (error) {
      throw error.message;
    }
  }
}
