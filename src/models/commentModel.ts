import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const CommentModel = {
    create: async (data: Prisma.CommentCreateInput) => {
        return prisma.comment.create({
            data,
        });
    },

    findAll: async () => {
        return prisma.comment.findMany();
    },

    findById: async (id: string) => {
        return prisma.comment.findUnique({
            where: { id },
        });
    },

    findByPostId: async (postId: string) => {
        return prisma.comment.findMany({
            where: { postId },
        });
    },

    update: async (id: string, data: Prisma.CommentUpdateInput) => {
        return prisma.comment.update({
            where: { id },
            data,
        });
    },

    delete: async (id: string) => {
        await prisma.comment.delete({
            where: { id },
        });
    },
};

export default CommentModel;
