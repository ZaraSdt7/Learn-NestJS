import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { ResponseMessages } from '../constants/response-messages.constant'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ResponseMessages.INVALID_ID)
    }
    return new Types.ObjectId(value)
  }
}
