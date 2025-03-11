import { z } from 'zod';
import { prisma } from '@/database/conection';
import { FastifyReply, FastifyRequest } from 'fastify';
import { hash } from 'bcrypt';
import { RegistrerService } from '@/service/registrer.service';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';
import { UserAlreadyExistsError } from '@/service/errors/user-already-exists';

export const registrerController = async (req: FastifyRequest, res: FastifyReply) => {
  const registrerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const {name, email, password} = registrerUserSchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registrerService = new RegistrerService(prismaUsersRepository);

    await registrerService.execute({
      name, email, password
    });
    
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send(error);
    }

    throw error
  }


  return res.status(201).send({message: 'user created'});
}