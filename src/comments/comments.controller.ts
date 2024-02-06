import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';
import { Blog } from 'src/blog/schema/blog.schema';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    user: User,
    blog: Blog,
  ) {
    return await this.commentService.create(createCommentDto, user, blog);
  }
  @Post('reply/:commentId')
  async replytocomment(
    @Param('commentid') commentid: string,
    @Body('reply') reply: string,
  ) {
    return await this.commentService.ReplyToComment(commentid, reply);
  }

  @Get()
  async findAll() {
    return await this.commentService.findall();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commentService.findByID(id);
  }
  @Patch(':id')
  ConfirmationComment(@Param() commentId: string) {
    return this.commentService.ConfirmComment(commentId);
  }
  @Delete(':id')
  async delete(user: User, @Param('id') id: string) {
    return await this.commentService.delete(user, id);
  }
}
