import { Module } from '@nestjs/common';
import { UploadFileController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadFileController],
  providers: [UploadService],
})
export class UploadFileModule {}
