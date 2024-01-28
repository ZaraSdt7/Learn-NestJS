import { BadRequestException, Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { ResponseMessages } from 'src/shared/constants/response-messages.constant';

@Injectable()
export class UploadService {
  async uploadfile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED);
    console.log(file);
    const path = './file-uploads/uploads';
    const state = await promises.stat(path);
    if (!state.isDirectory()) {
      await promises.mkdir(path, { recursive: true });
    }
    return `File ${file.filename} successfully uploaded`;
  }
}
