import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27027/'),
    PostsModule,
  ],
})
export class AppModule {}
