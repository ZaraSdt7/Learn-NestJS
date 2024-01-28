import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { ApiFile } from 'src/shared/decorators/api-file.decorator';
import { Filestorage } from './upload.storages';
import { Filefilter } from './filter/file.filters';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('upload-file')
@ApiBearerAuth()
@Controller('uploads')
export class UploadFileController {
  constructor(private uploadservise: UploadService) {}

  @ApiOperation({
    summary: 'upload photo',
    description: ' this api method upload a photo',
  })
  @ApiConsumes('multipart/form-data')
  @ApiFile('thumbnail')
  @Post('posts')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: Filestorage(),
      fileFilter: Filefilter,
    }),
  )
  async uploadfile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadservise.uploadfile(file);
  }
}
