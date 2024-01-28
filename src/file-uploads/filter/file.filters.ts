import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import { ResponseMessages } from 'src/shared/constants/response-messages.constant';

export function Filefilter(req: Request, file: any, cb: FileFilterCallback) {
  const maxsize = 1024 * 1024 * 7; //7mb
  if (file.size > maxsize) {
    cb(new BadRequestException(ResponseMessages.FILE_SIZE_TOO_LARGE));
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new BadRequestException(ResponseMessages.INVALID_FILE_FORMAT));
  }
  cb(null, true);
}
