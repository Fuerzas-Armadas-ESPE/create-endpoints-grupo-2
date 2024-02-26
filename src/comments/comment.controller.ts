import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { Comment } from './comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return await this.commentsService.getAllComments();
  }

  @Get(':id')
  async getComment(@Param('id') id: string): Promise<Comment | null> {
    try {
      return await this.commentsService.getComment(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Get('post/:postId')
  async getCommentsByPostId(@Param('postId') postId: string): Promise<Comment[]> {
    try {
      return await this.commentsService.getCommentsByPostId(postId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  async createComment(@Body() commentData: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    try {
      return await this.commentsService.createComment(commentData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async updateComment(@Param('id') id: string, @Body() commentData: Partial<Comment>): Promise<Comment | null> {
    try {
      return await this.commentsService.updateComment(id, commentData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string): Promise<void> {
    try {
      await this.commentsService.deleteComment(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
