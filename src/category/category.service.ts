import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { ResponseFormat } from 'src/shared/interfaces/response.interface';
import { ResponseMessages } from 'src/shared/constants/response-messages.constant';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categorymodel: Model<Category>,
  ) {}
  async create(
    createCategory: CreateCategoryDto,
  ): Promise<ResponseFormat<any>> {
    try {
      const { title, parent } = createCategory;
      //exist parent
      if (parent) {
        const existparent = await this.categorymodel.findById(parent);
        if (!existparent) {
          throw new BadRequestException(
            ResponseMessages.PARENT_CATEGORY_NOT_EXISTS,
          );
        }
      }
      //create
      const created = await this.categorymodel.create({ title, parent });
      if (!created) {
        throw new InternalServerErrorException(ResponseMessages.SERVER_ERROR);
      }
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          category: created,
        },
      };
    } catch (error) {
      throw error.message;
    }
  }

  async update(
    id: string,
    updateCategory: UpdateCategoryDto,
  ): Promise<ResponseFormat<any>> {
    try {
      //check exist category id
      const existID = await this.categorymodel.findById(id);
      if (!existID) {
        throw new BadRequestException(ResponseMessages.CATEGORY_NOT_FOUND);
      }
      //check parent category
      if (parent) {
        const existparent = await this.categorymodel.findById(parent);
        if (!existparent) {
          throw new BadRequestException(
            ResponseMessages.PARENT_CATEGORY_NOT_EXISTS,
          );
        }
      }
      //update
      const updated = await this.categorymodel.updateOne(
        { _id: id },
        updateCategory,
      );
      if (updated.modifiedCount == 0) {
        throw new BadRequestException(ResponseMessages.FAILED_UPDATE_CATEGORY);
      }
      return {
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error.message;
    }
  }
  async findAll() {
    return await this.categorymodel.find().exec();
  }

  async findByID(id: string): Promise<ResponseFormat<any>> {
    //find category id
    const category = await this.categorymodel.findById(id);
    if (!category) {
      throw new BadRequestException(ResponseMessages.CATEGORY_NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        category,
      },
    };
  }

  async remove(id: string): Promise<ResponseFormat<any>> {
    const findID = await this.categorymodel.findById({ _id: id });
    if (!findID) {
      throw new BadRequestException(ResponseMessages.CATEGORY_NOT_FOUND);
    }
    const removed = await this.categorymodel.deleteOne({ _id: id });
    if (removed.deletedCount == 0) {
      throw new BadRequestException(ResponseMessages.FAILED_DELETE_CATEGORY);
    }
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
