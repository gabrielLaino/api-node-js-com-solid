import { z } from 'zod';
import { prisma } from '@/database/conection';
import { FastifyReply, FastifyRequest } from 'fastify';
import { hash } from 'bcrypt';
import { registrerService } from '@/service/registrer.service';

export const registrerController = async (req: FastifyRequest, res: FastifyReply) => {
  const registrerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const {name, email, password} = registrerUserSchema.parse(req.body);

  try {
    await registrerService({
      name, email, password
    });
  } catch (error) {
    return res.status(409).send(error);
  
  }


  return res.status(201).send({message: 'user created'});
}