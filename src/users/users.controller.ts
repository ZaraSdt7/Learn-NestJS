import {
  Controller,
  Get,
  HttpStatus,
  Req,
  UnauthorizedException,
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
import { ResponseFormat } from 'src/shared/interfaces/response.interface';
import { ResponseMessages } from 'src/shared/constants/response-messages.constant';
// import { CreateUserDto } from './dto/create-user.dto';

// import { User } from './schemas/user.schema';
@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private userservice: UsersService) {}

  @UseGuards(AuthGuard())
  @Get()
  getuser(@Req() req: any): ResponseFormat<any> {
    if (!req.user) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED);
    }
    delete req.user.password;
    return {
      statusCode: HttpStatus.OK,
      data: {
        user: req.user,
      },
    };
  }
}
