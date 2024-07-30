import db from '../config/database';
import { IPost } from '../interfaces/IPost';

class PostRepository {
  async create(data: IPost): Promise<IPost> {
    const { title, content, authorId } = data;
    const result = await db.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return result as IPost;
  }

  async findAll(): Promise<IPost[]> {
    const result = await db.post.findMany({
      orderBy: { modifiedAt: 'desc' },
    });
    return result as IPost[];
  }

  async findById(id: string): Promise<IPost | null> {
    const result = await db.post.findFirstOrThrow({
      where: { id: id },
    });
    return result as IPost;
  }

  async update(id: string, data: Partial<IPost>): Promise<IPost | null> {
    const { title, content } = data;
    const result = await db.post.update({
      where: { id: id },
      data: {
        title,
        content,
      },
    });
    return result as IPost;
  }

  async delete(id: string): Promise<void> {
    await db.post.delete({
      where: {
        id: id,
      },
    });
  }

  async search(keyword: string): Promise<IPost[]> {
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
  }
}

export default new PostRepository();
