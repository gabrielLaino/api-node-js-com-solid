import fastify from "fastify";
import { ZodError } from 'zod';
import { usersRoutes } from "./routes/users";
import env from "./env";

export const app = fastify();


app.register(usersRoutes, {
  prefix: 'users'
});

app.setErrorHandler((error, req, res) => {
  if (error instanceof ZodError) {
    res.status(400).send({
      message: 'Validadion error.',
      error: error.format()
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return res.status(500).send({
    message: 'Internal server error.'
  })
});