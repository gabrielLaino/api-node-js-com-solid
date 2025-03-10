import fastify from "fastify";
import { z } from 'zod';
import { PrismaClient } from "@prisma/client";
import { registrerController } from "./controller/registrer.controller";
import { usersRoutes } from "./routes/users";

export const app = fastify();


app.register(usersRoutes, {
  prefix: 'users'
})