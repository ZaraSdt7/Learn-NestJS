import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
  ) {}
  async FindUserByMobile(mobile: string): Promise<User> {
    try {
      const existmobile = await this.UserModel.findOne({ mobile }).exec();
      if (existmobile) {
        return existmobile;
      } else {
        throw new NotFoundException('Mobile not found');
      }
    } catch (error) {
      return error;
    }
  }
  async CreateUser(userdata: CreateUserDto): Promise<User> {
    try {
      const finduser = await this.UserModel.findOne({
        mobile: userdata.mobile,
      }).exec();
      if (finduser) {
        throw new BadRequestException('user mobile already exist');
      }
      return (await this.UserModel.create(userdata)).save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error create user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
