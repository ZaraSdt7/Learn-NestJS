import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usermodel: Model<User>,
  ) {}

  async GetAllUser(): Promise<User[]> {
    return await this.usermodel.find().exec();
  }
}
