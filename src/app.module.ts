import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comment.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27027/'),
    PostsModule,
    CommentsModule
  ],
})
export class AppModule {}
