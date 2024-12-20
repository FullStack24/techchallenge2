import { PrismaClient, Comment as PrismaComment } from "@prisma/client";
import { IComment } from "../interfaces/IComment";

const prisma = new PrismaClient();

const CommentRepository = {
    async create(data: Omit<IComment, "id" | "created_at">): Promise<IComment> {
        const { post_id, author, content } = data;

        if (!post_id) {
            console.error('post_id está indefinido');
            throw new Error("post_id is required");
        }

        const postExists = await prisma.post.findUnique({
            where: { id: post_id },
        });

        if (!postExists) {
            console.error(`Post com ID ${post_id} não encontrado`);
            throw new Error("Post not found");
        }

        const comment = await prisma.comment.create({
            data: {
                postId: post_id,
                author,
                content,
                parentId: data.parent_id,
            },
        }) as PrismaComment;

        return {
            id: comment.id,
            post_id: comment.postId,
            author: comment.author,
            content: comment.content,
            created_at: comment.createdAt.toISOString(),
            parent_id: comment.parentId || undefined,
        };
    },

    async findAll(): Promise<IComment[]> {
        const comments = await prisma.comment.findMany();
        return comments.map(comment => ({
            id: comment.id,
            post_id: comment.postId,
            author: comment.author,
            content: comment.content,
            created_at: comment.createdAt.toISOString(),
            parent_id: comment.parentId || undefined,
        }));
    },

    async findById(id: string): Promise<IComment | null> {
        const comment = await prisma.comment.findUnique({
            where: { id },
            include: { replies: true },
        }) as PrismaComment | null;

        if (!comment) return null;

        return {
            id: comment.id,
            post_id: comment.postId,
            author: comment.author,
            content: comment.content,
            created_at: comment.createdAt.toISOString(),
            parent_id: comment.parentId || undefined,
        };
    },

    async findByPostId(postId: string): Promise<IComment[]> {
        const comments = await prisma.comment.findMany({
            where: { postId, parentId: null },
            include: { replies: true },
        });

        return comments.map(comment => ({
            id: comment.id,
            post_id: comment.postId,
            author: comment.author,
            content: comment.content,
            created_at: comment.createdAt.toISOString(),
            parent_id: comment.parentId || undefined,
            replies: comment.replies.map(reply => ({
                id: reply.id,
                post_id: reply.postId,
                author: reply.author,
                content: reply.content,
                created_at: reply.createdAt.toISOString(),
                parent_id: reply.parentId || undefined,
            }))
        }));
    },

    async update(
        id: string,
        data: Partial<Omit<IComment, "id" | "created_at">>,
    ): Promise<IComment | null> {
        const { author, content } = data;
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: {
                author,
                content,
            },
        }) as PrismaComment;

        return {
            id: updatedComment.id,
            post_id: updatedComment.postId,
            author: updatedComment.author,
            content: updatedComment.content,
            created_at: updatedComment.createdAt.toISOString(),
            parent_id: updatedComment.parentId || undefined,
        };
    },

    async delete(id: string): Promise<void> {
        await prisma.comment.delete({
            where: { id },
        });
    },

    async createReply(data: Omit<IComment, "id" | "created_at">): Promise<IComment> {
        const { post_id, author, content, parent_id } = data;

        const postExists = await prisma.post.findUnique({
            where: { id: post_id },
        });

        if (!postExists) {
            console.error(`Post com ID ${post_id} não encontrado`);
            throw new Error("Post not found");
        }

        const comment = await prisma.comment.create({
            data: {
                postId: post_id,
                author,
                content,
                parentId: parent_id,
            },
        }) as PrismaComment;

        return {
            id: comment.id,
            post_id: comment.postId,
            author: comment.author,
            content: comment.content,
            created_at: comment.createdAt.toISOString(),
            parent_id: comment.parentId || undefined,
        };
    }
};

export default CommentRepository;
