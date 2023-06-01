import Fastify from 'fastify';
import { app } from './app/app';
import { env } from './env/env';

const host = env.HOST;
const port = env.PORT;

// Instantiate Fastify with some config
const server = Fastify({
  logger: !env.LOG_PRETTY ? true : {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    }
  },
});

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
