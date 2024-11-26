import CommentRepository from "../repositories/commentRepository";
import { IComment } from "../interfaces/IComment";

class CommentService {
    private commentRepository: typeof CommentRepository;

    constructor(commentRepository: typeof CommentRepository) {
        this.commentRepository = commentRepository;
    }

    async createComment(data: Omit<IComment, "id" | "created_at">): Promise<IComment> {
        return this.commentRepository.create(data);
    }

    async getCommentsByPost(postId: string): Promise<IComment[]> {
        return this.commentRepository.findByPostId(postId);
    }

    async getCommentById(id: string): Promise<IComment | null> {
        return this.commentRepository.findById(id);
    }

    async updateComment(id: string, data: Partial<Omit<IComment, "id" | "created_at">>): Promise<IComment | null> {
        return this.commentRepository.update(id, data);
    }

    async deleteComment(id: string): Promise<void> {
        await this.commentRepository.delete(id);
    }

    async replyToComment(data: Omit<IComment, "id" | "created_at">): Promise<IComment> {
        return this.commentRepository.createReply(data);
    }
}

export default new CommentService(CommentRepository);
