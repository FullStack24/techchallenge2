import { PrismaClient, Prisma } from "@prisma/client";
import { IPost } from "../interfaces/IPost";

const prisma = new PrismaClient();

const PostRepository = {
  async create(data: IPost): Promise<IPost> {
    const { title, content, author } = data;
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return result as IPost;
  },

  async findAll(): Promise<IPost[]> {
    const result = await prisma.post.findMany();
    return result.map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      author: row.author,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })) as IPost[];
  },

  async findById(id: number): Promise<IPost | null> {
    const result = await prisma.post.findUnique({
      where: { id },
    });
    return result ? (result as IPost) : null;
  },

  async update(id: number, data: Partial<IPost>): Promise<IPost | null> {
    const { title, content } = data;
    const result = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });
    return result ? (result as IPost) : null;
  },

  async delete(id: number): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
  },

  async search(keyword: string): Promise<IPost[]> {
    const result = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
    });
    return result.map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      author: row.author,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })) as IPost[];
  },

  async customQuery<T>(query: Prisma.Sql, params: T[]): Promise<T[]> {
    return prisma.$queryRaw<T[]>(query, ...params);
  },
};

export default PostRepository;
