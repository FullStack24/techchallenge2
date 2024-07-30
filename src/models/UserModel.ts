import db from '../config/database';
import bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';

export default class UserModel {
  static async create(data: {
    username: string;
    password: string;
  }): Promise<IUser> {
    const { username, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return newuser as IUser;
  }

  static async findByUsername(
    username: string
  ): Promise<{ id: string; username: string; password: string }> {
    const result = await db.user.findFirstOrThrow({
      where: { username },
      select: {
        password: true,
        id: true,
        username: true,
      },
    });
    return result;
  }

  static async findAll(): Promise<{ id: string; username: string }[]> {
    const result = await db.user.findMany({
      select: {
        id: true,
        username: true,
        password: false,
      },
    });
    return result;
  }
}
