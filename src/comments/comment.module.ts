import { Module } from '@nestjs/common';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
