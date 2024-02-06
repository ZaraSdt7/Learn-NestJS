import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schema/comment.schema';
import { UsersModule } from 'src/users/users.module';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UsersModule,
    BlogModule,
  ],
  controllers: [CommentController],
  providers: [CommentsService],
})
export class CommentsModule {}
