import db from '../config/database';
import { IPost } from '../interfaces/IPost';

const PostModel = {
  create: async (data: IPost): Promise<IPost> => {
    const { title, content, authorId } = data;
    const result = await db.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return result as IPost;
  },

  findAll: async (): Promise<IPost[]> => {
    const result = await db.post.findMany({
      orderBy: { modifiedAt: 'desc' },
    });
    return result as IPost[];
  },

  findById: async (id: string): Promise<IPost> => {
    const result = await db.post.findFirstOrThrow({
      where: { id: id },
    });
    return result as IPost;
  },

  update: async (id: string, data: Partial<IPost>): Promise<IPost | null> => {
    const { title, content } = data;
    const result = await db.post.update({
      where: { id: id },
      data: {
        title,
        content,
      },
    });
    return result as IPost;
  },

  delete: async (id: string): Promise<void> => {
    await db.post.delete({
      where: {
        id: id,
      },
    });
  },

  search: async (keyword: string): Promise<IPost[]> => {
    const result = await db.post.findMany({
      where: {
        title: {
          contains: keyword,
        },
        content: {
          contains: keyword,
        },
      },
    });
    return result as IPost[];
  },
};

export default PostModel;
