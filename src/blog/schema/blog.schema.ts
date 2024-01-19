import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Blog extends Document {
  @Prop({
    type: String,
    required: true,
    min: 3,
    max: 200,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    min: 3,
    max: 200,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  contact: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  author: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: 'Category',
  })
  category: string[];

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    default: [],
  })
  likes: string[];

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    default: [],
  })
  bookmark: string[];

  @Prop({
    type: [String],
    default: [],
  })
  image: string[];
}

export type BlogDocument = Blog;
export const BlogSchema = SchemaFactory.createForClass(Blog);
