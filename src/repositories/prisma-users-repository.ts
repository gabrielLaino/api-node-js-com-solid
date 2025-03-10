import { prisma } from "@/database/conection";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    });

    return user;
  }
}