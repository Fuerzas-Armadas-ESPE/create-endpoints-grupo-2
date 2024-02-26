import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { Comment } from './comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllComments(): Comment[] {
    return this.commentsService.getAllComments();
  }

  @Get('post/:postId')
  getCommentsByPostId(@Param('postId') postId: string): Comment[] {
    return this.commentsService.getCommentsByPostId(postId);
  }

  @Get(':id')
  getComment(@Param('id') id: string): Comment {
    const comment = this.commentsService.getComment(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  @Post()
  createComment(@Body() commentData: Omit<Comment, 'id' | 'createdAt'>): Comment {
    try {
      return this.commentsService.createComment(commentData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  updateComment(@Param('id') id: string, @Body() commentData: Partial<Comment>): Comment {
    try {
      return this.commentsService.updateComment(id, commentData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string): void {
    try {
      this.commentsService.deleteComment(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
