import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {}

    async getAllComments(): Promise<Comment[]> {
        return await this.commentModel.find().exec();
    }

    async getCommentsByPostId(postId: string): Promise<Comment[]> {
        return await this.commentModel.find({ postId }).exec();
    }

    async getComment(id: string): Promise<Comment | null> {
        try {
            const comment = await this.commentModel.findById(id).exec();
            if (!comment) {
                throw new NotFoundException('Comment not found');
            }
            return comment;
        } catch (error: any) {
            throw new NotFoundException(error.message);
        }
    }

    async createComment(commentData: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
        try {
            const createdComment = new this.commentModel(commentData);
            return await createdComment.save();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateComment(id: string, commentData: Partial<Comment>): Promise<Comment | null> {
        try {
            const existingComment = await this.commentModel.findById(id).exec();
            if (!existingComment) {
                throw new NotFoundException('Comment not found');
            }
            existingComment.set(commentData);
            return await existingComment.save();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteComment(id: string): Promise<void> {
        try {
            await this.commentModel.findByIdAndDelete(id).exec();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
