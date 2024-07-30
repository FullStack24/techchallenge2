import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UserRepository = {
  async validateUser(username: string, password: string) {
    return prisma.user.findFirst({
      where: {
        username,
        password,
      },
      select: {
        id: true,
        username: true,
      },
    });
  },

  async getUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
      },
    });
  },

  async createUser(username: string, password: string) {
    return prisma.user.create({
      data: {
        username,
        password,
      },
      select: {
        id: true,
        username: true,
      },
    });
  },
};

export default UserRepository;
