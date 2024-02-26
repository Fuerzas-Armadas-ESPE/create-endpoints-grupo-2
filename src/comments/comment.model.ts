import { Schema, Document, Types } from 'mongoose';

export interface Comment extends Document {
  content: string;
  createdAt: Date;
  postId: Types.ObjectId; // Usar Types.ObjectId en lugar de Schema.Types.ObjectId
}

export const CommentSchema = new Schema<Comment>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    postId: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true }
);
