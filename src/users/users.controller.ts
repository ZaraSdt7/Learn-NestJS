import {
  Controller,
  Get,
  UseGuards,
  // Get,
  // Post,
  // Body,
  // Param,
  // NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
// import { CreateUserDto } from './dto/create-user.dto';

// import { User } from './schemas/user.schema';
@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private userservice: UsersService) {}

  @UseGuards(AuthGuard())
  @Get()
  async getuser(): Promise<User[]> {
    return this.userservice.GetAllUser();
  }
}
