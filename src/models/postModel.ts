import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const PostModel = {
  create: async (data: Prisma.PostCreateInput) => {
    return prisma.post.create({
      data,
    });
  },

  findAll: async () => {
    return prisma.post.findMany();
  },

  findById: async (id: number) => {
    return prisma.post.findUnique({
      where: { id },
    });
  },

  update: async (id: number, data: Prisma.PostUpdateInput) => {
    return prisma.post.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    await prisma.post.delete({
      where: { id },
    });
  },

  search: async (keyword: string) => {
    return prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
    });
  },
};

export default PostModel;
