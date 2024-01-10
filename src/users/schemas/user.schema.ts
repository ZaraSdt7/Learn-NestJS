import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  phoneNumberNormalizer,
  phoneNumberValidator,
} from '@persian-tools/persian-tools';
import { Document, Types } from 'mongoose';
// export type UserDocument = HydratedDocument<User>;
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
  versionKey: false,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User extends Document {
  //unique name class
  @Prop({ required: true, type: Types.ObjectId, ref: 'user' })
  userID: string;

  @Prop({
    type: String,
    maxlength: [20, 'نام نمی‌تواند بیشتر از 20 حرف باشد.'],
    trim: true,
    required: true,
  })
  fullname: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'شماره تلفن الزامیست.'],
    unique: true,
    trim: true,
    validate: {
      validator: phoneNumberValidator,
      message: 'شماره تلفن وارد شده معتبر نمی‌باشد.',
    },
    set: (mobile: string) => phoneNumberNormalizer(mobile, '0'),
  })
  mobile: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    default: Role.USER,
    enum: Role,
  })
  role: string;
}
export const Userschema = SchemaFactory.createForClass(User);
