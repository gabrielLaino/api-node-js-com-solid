import { prisma } from "@/database/conection";
import { hash } from "bcrypt";
import {  UsersRegistrer } from '../@types/user'
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export const registrerService = async ({
  name, email, password
}: UsersRegistrer) => {
  const passwordHash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (userWithSameEmail) {
    throw new Error('E-mail alrery exist')
  }

  const prismaUsersRepository = new PrismaUsersRepository;

  await prismaUsersRepository.create({name, email, password_hash: passwordHash});
}