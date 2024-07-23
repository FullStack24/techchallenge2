import db from '../config/database';
import bcrypt from 'bcryptjs';

export default class UserModel {
  static async create(username: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hashedPassword]
    );
  }

  static async findByUsername(username: string): Promise<{ id: number; username: string; password: string } | null> {
    const result = await db.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  static async findAll(): Promise<{ id: number; username: string }[]> {
    const result = await db.query('SELECT id, username FROM users');
    return result.rows;
  }
}