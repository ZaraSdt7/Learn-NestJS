import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Category extends Document {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    default: undefined,
    ref: 'Category',
  })
  parent: mongoose.Types.ObjectId;
}

export type CategoryDocument = Category;
export const CategorySchema = SchemaFactory.createForClass(Category);
