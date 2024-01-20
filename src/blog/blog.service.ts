import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schema/blog.schema';
import { Model } from 'mongoose';
import { ResponseFormat } from 'src/shared/interfaces/response.interface';
import { ResponseMessages } from 'src/shared/constants/response-messages.constant';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogmodel: Model<Blog>,
  ) {}
  async create(BlogDto: CreateBlogDto): Promise<ResponseFormat<any>> {
    try {
      const { title, description, content, author, category } = BlogDto;
      const create = await this.blogmodel.create({
        title,
        description,
        content,
        author,
        category,
      });
      if (!create) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_CREATE_BLOG,
        );
      }
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          blog: create,
        },
      };
    } catch (error) {
      throw error.message;
    }
  }

  async update(
    id: string,
    updateBlog: UpdateBlogDto,
  ): Promise<ResponseFormat<any>> {
    try {
      const existid = await this.blogmodel.findById(id);
      if (!existid) {
        throw new BadRequestException(ResponseMessages.BLOG_NOT_FOUND);
      }
      const updatedata = await this.blogmodel.updateOne({ id: id }, updateBlog);
      if (!updatedata) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_UPDATE_BLOG,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        data: {
          blog: updateBlog,
        },
      };
    } catch (error) {
      throw error.message;
    }
  }
  async findAll(): Promise<ResponseFormat<any>> {
    const gets = await this.blogmodel
      .find()
      .populate([
        {
          path: 'category',
          select: { value: 1, _id: 1 },
        },
        {
          path: 'author',
          select: { createAt: 0, updateAt: 0 },
        },
      ])
      .exec();
    return {
      statusCode: HttpStatus.OK,
      data: {
        blog: gets,
      },
    };
  }

  async findByID(id: string): Promise<ResponseFormat<any>> {
    try {
      const find = await this.blogmodel.findById(id);
      if (!find) {
        throw new BadRequestException(ResponseMessages.BLOG_NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        data: {
          blog: find,
        },
      };
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: string): Promise<ResponseFormat<any>> {
    try {
      const findid = await this.blogmodel.findById(id);
      if (!findid) {
        throw new BadRequestException(ResponseMessages.BLOG_NOT_FOUND);
      }
      const deleted = await this.blogmodel.deleteOne({ _id: id });
      if (!deleted.deletedCount) {
        throw new BadRequestException(ResponseMessages.FAILED_DELETE_BLOG);
      }
      return {
        statusCode: HttpStatus.OK,
        data: {
          message: `Delete blog ${id} successfully`,
        },
      };
    } catch (error) {
      throw error.message;
    }
  }

  async LiksBlog(blogid: string, userid: string) {
    try {
      const finds = await this.blogmodel.findOne({
        _id: blogid,
        likes: userid,
      });
      const updateData = finds
        ? { $pull: { liks: userid } }
        : { $push: { liks: userid } };
      await this.blogmodel.updateOne({ _id: blogid }, updateData);
      return updateData
        ? ResponseMessages.UNLIKED_BLOG
        : ResponseMessages.LIKED_BLOG;
    } catch (error) {
      throw error.message;
    }
  }
  async BookmarksBlog(blogid: string, userid: string) {
    try {
      const finds = await this.blogmodel.findOne({
        _id: blogid,
        bookmark: userid,
      });
      const updateData = finds
        ? { $pull: { bookmark: userid } }
        : { $push: { bookmark: userid } };
      await this.blogmodel.updateOne({ _id: blogid }, updateData);
      return updateData
        ? ResponseMessages.REMOVE_FROM_BOOKMARK
        : ResponseMessages.ADD_TO_BOOKMARK;
    } catch (error) {
      throw error.message;
    }
  }
}
