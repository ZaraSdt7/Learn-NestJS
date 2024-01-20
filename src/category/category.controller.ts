import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id.pipe';
@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.categoryService.findByID(id);
  }
  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }
  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.categoryService.remove(id);
  }
}
