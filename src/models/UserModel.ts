import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default class UserModel {
  static async create(username: string, email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  }

  static async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  static async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
}

export { User };
