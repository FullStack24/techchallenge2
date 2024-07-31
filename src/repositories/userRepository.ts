import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/IUser";

const prisma = new PrismaClient();

const UserRepository = {
  async validateUser(
    username: string,
    password: string,
  ): Promise<IUser | null> {
    return prisma.user.findFirst({
      where: {
        username,
        password,
      },
      select: {
        id: true,
        username: true,
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
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Promise<IUser | null>;
  },

  async createUser(username: string, password: string): Promise<IUser> {
    return prisma.user.create({
      data: {
        username,
        password,
      },
      select: {
        id: true,
        username: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    }) as Promise<IUser>;
  },
};

export default UserRepository;
