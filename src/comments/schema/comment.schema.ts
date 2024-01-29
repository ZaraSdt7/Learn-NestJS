import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Comment extends Document {
  @Prop({
    type: String,
  })
  text: string;

  @Prop({
    type: Types.ObjectId,
  })
  reply: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  })
  user: User;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Blog',
  })
  blog: [string];
}

export type DocumentComment = Comment;
export const CommentSchema = SchemaFactory.createForClass(Comment);
