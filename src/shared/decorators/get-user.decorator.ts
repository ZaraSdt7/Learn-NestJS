import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from 'src/users/schemas/user.schema';

export const GetUsers = createParamDecorator(
  (keyname: keyof UserDocument, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const user = req.user;
    return keyname ? user[keyname] : user;
  },
);
