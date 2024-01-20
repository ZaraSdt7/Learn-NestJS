import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id.pipe';
@ApiBearerAuth()
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: any) {
    createBlogDto.author = req.user._id;
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.blogService.findByID(id);
  }
  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.update(id, updateBlogDto);
  }
  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.blogService.remove(id);
  }
  @UseGuards(AuthGuard())
  @Patch(':id/likes')
  likeBlog(@Param('id', new ParseMongoIdPipe()) id: string, @Req() req: any) {
    return this.blogService.LiksBlog(id, req.user._id);
  }
  @UseGuards(AuthGuard())
  @Patch(':id/likes')
  bookmarkBlog(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Req() req: any,
  ) {
    return this.blogService.BookmarksBlog(id, req.user._id);
  }
}
