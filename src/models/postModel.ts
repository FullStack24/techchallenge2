import db from '../config/database';
import { IPost } from '../interfaces/IPost';
const PostModel = {
  create: async (data: IPost): Promise<IPost> => {
    const { title, content, author } = data;
    const result = await db.query(
      'INSERT INTO posts (title, content, author, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
      [title, content, author]
    );
    return result.rows[0] as IPost;
  },

  findAll: async (): Promise<IPost[]> => {
    const result = await db.query('SELECT * FROM posts');
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content,
      author: row.author,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })) as IPost[];
  },

  findById: async (id: number): Promise<IPost | null> => {
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows.length > 0 ? (result.rows[0] as IPost) : null;
  },

  update: async (id: number, data: Partial<IPost>): Promise<IPost | null> => {
    const { title, content } = data;
    const result = await db.query(
      'UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    return result.rows.length > 0 ? (result.rows[0] as IPost) : null;
  },

  delete: async (id: number): Promise<void> => {
    await db.query('DELETE FROM posts WHERE id = $1', [id]);
  },

  search: async (keyword: string): Promise<IPost[]> => {
    const result = await db.query(
      'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1',
      [`%${keyword}%`]
    );
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content,
      author: row.author,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })) as IPost[];
  }
};

export default PostModel;