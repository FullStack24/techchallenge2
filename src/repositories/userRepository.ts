import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/IUser";

const prisma = new PrismaClient();

const UserRepository = {
  async validateUser(
    email: string,
    password: string,
  ): Promise<IUser | null> {
    return prisma.user.findFirst({
      where: {
        email,
        password,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Promise<IUser | null>;
  },

  async getUserById(userId: string): Promise<IUser | null> {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Promise<IUser | null>;
  },

  async createUser(username: string, email: string, password: string): Promise<IUser> {
    return prisma.user.create({
      data: {
        username,
        email,
        password,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Promise<IUser>;
  },

  async findAll(): Promise<IUser[]> {
    const users = await prisma.user.findMany();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  },
};

export default UserRepository;
