import {
    Injectable,
    NotFoundException,
    BadRequestException
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
    private comments: Comment[] = [];

    constructor() {
        this.createComment({
            content: 'Primer comentario',
            postId: '474ba1f6-bf10-4b10-8cd4-ca1b03ceceb6',
        });
        this.createComment({
            content: 'Segundo comentario',
            postId: '8a1e2761-5301-477e-8de6-ad1f1614471e',
        });
        this.createComment({
            content: 'Tercer comentario',
            postId: 'abd8449c-5fa2-4f8a-bf27-7430e6ace42a',
        });
    }

    getAllComments(): Comment[] {
        return this.comments;
    }

    getCommentsByPostId(postId: string): Comment[] {
        return this.comments.filter(comment => comment.postId === postId);
    }

    getComment(id: string): Comment {
        const comment = this.comments.find(comment => comment.id === id);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        return comment;
    }

    createComment(commentData: Omit<Comment, 'id' | 'createdAt'>): Comment {
        if (!commentData.content || !commentData.postId) {
            throw new BadRequestException('Content and postId are required');
        }

        const newComment: Comment = {
            id: uuidv4(),
            createdAt: new Date(),
            ...commentData,
        };

        this.comments.push(newComment);
        return newComment;
    }

    updateComment(id: string, commentData: Partial<Comment>): Comment {
        const commentIndex = this.comments.findIndex(comment => comment.id === id);
        if (commentIndex === -1) {
            throw new NotFoundException('Comment not found');
        }

        const updatedComment = { ...this.comments[commentIndex], ...commentData };
        this.comments[commentIndex] = updatedComment;

        return updatedComment;
    }

    deleteComment(id: string): void {
        const index = this.comments.findIndex(comment => comment.id === id);
        if (index === -1) {
            throw new NotFoundException('Comment not found');
        }
        this.comments.splice(index, 1);
    }
}
