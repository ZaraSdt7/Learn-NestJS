import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comment.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Blog } from 'src/blog/schema/blog.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentmodel: Model<Comment>,
  ) {}
  async create(
    commentDto: CreateCommentDto,
    user: User,
    blog: Blog,
  ): Promise<Comment> {
    try {
      commentDto.text = commentDto.text;
      const commentuser = (await this.commentmodel.find({ user })).length;
      if (commentuser >= 10)
        throw new BadRequestException(
          'The comment user can only add up to 10 comments',
        );
      const create = await this.commentmodel.create({
        ...commentDto,
        user,
        blog,
      });
      return create.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError create comment',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async ConfirmComment(id: string): Promise<Comment> {
    try {
      const comments = await this.commentmodel
        .findOne({ id })
        .populate('blog', 'title');
      if (!comments) {
        throw new NotFoundException(`Comment ${id} not found`);
      }
      comments.flag = true;
      return await comments.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError confirm comment',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async delete(user: User, id: string): Promise<Comment> {
    try {
      const comments = await this.commentmodel.findOne({
        _id: id,
        user: user.id,
      });
      if (!comments) {
        throw new NotFoundException(`Comment  user ${id} not found`);
      }
      await this.commentmodel.findByIdAndDelete(comments);
      return comments;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'ّError delete comment',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
  async ReplyToComment(commentid: string, reply: string): Promise<Comment> {
    try {
      const orginalcomment = await this.commentmodel.findById(commentid);
      if (!orginalcomment) {
        throw new NotFoundException('Orginal comment not found!');
      }
      const replycomment = new this.commentmodel({
        reply: reply,
      });
      orginalcomment.reply = reply;
      return await replycomment.save();
    } catch (error) {
      throw new Error(`Error replying to comment: ${error.message}`);
    }
  }
  async findall(): Promise<Array<Comment>> {
    return await this.commentmodel.find().exec();
  }
  async findByID(id: string): Promise<Comment> {
    const findId = await this.commentmodel.findOne({ id });
    if (!findId) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return findId;
  }
}
