import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ResponseMessages } from 'src/shared/constants/response-messages.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly usermodel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_JWT,
    });
  }
  async validate(payload: any) {
    const { id } = payload;
    const users = await this.usermodel.findById(id);
    if (!users) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
    return users;
  }
}
