import { z } from 'zod';
import { prisma } from '@/database/conection';
import { FastifyReply, FastifyRequest } from 'fastify';

export const registrerController = async (req: FastifyRequest, res: FastifyReply) => {
  const registrerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const {name, email, password} = registrerUserSchema.parse(req.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password
    }
  });

  return res.status(201).send({message: 'user created'});
}