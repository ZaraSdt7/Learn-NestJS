import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  phoneNumberNormalizer,
  phoneNumberValidator,
} from '@persian-tools/persian-tools';
import mongoose, { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
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
export class User {
  //unique name class
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  userID: string;
  @Prop({
    type: String,
    maxlength: [20, 'نام نمی‌تواند بیشتر از 20 حرف باشد.'],
    trim: true,
  })
  username: string;
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
}
export const Userschema = SchemaFactory.createForClass(User);
