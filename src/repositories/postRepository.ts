import { PrismaClient } from "@prisma/client";
import { IPost } from "../interfaces/IPost";

const prisma = new PrismaClient();

const PostRepository = {
  async create(data: Omit<IPost, "createdAt" | "updatedAt">): Promise<IPost> {
    const { title, content = "", author } = data;
    return prisma.post.create({
      data: {
        title,
        content,
        author,
      },
    });
  },

  async findAll(): Promise<IPost[]> {
    return prisma.post.findMany();
  },

  async findById(id: string): Promise<IPost | null> {
    return prisma.post.findUnique({
      where: { id },
    });
  },

  async update(
      id: string,
      data: Partial<Omit<IPost, "createdAt" | "updatedAt">>,
  ): Promise<IPost | null> {
    const { title, content = "", author } = data;
    return prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        author,
        updatedAt: new Date(),
      },
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
  },

  async search(keyword: string): Promise<IPost[]> {
    return prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
    });
  },

  async userLikedPost(userId: string, postId: string): Promise<boolean> {
    try {
      const like = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return like !== null;
    } catch (error) {
      console.error("Error checking if user liked post:", error);
      throw error;
    }
  },

  async addLike(userId: string, postId: string): Promise<void> {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  },

  async incrementLikes(postId: string): Promise<IPost | null> {
    return prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          increment: 1,
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: true,
        likes: true,
      },
    });
  },
};

export default PostRepository;