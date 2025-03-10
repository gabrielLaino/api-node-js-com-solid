import { registrerController } from "@/controller/registrer.controller"
import { FastifyInstance } from "fastify"

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('', registrerController);
}