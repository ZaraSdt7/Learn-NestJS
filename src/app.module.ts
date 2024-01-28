import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
// import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import configuration from './config/app.config';
import { UploadFileModule } from './file-uploads/upload.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MulterModule.register({ dest: './file-uploads' }),
    AuthModule,
    UsersModule,
    BlogModule,
    CategoryModule,
    UploadFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
