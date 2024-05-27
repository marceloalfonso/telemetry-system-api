import routes from './routes';
import fastify from 'fastify';

const server = fastify();

server.register(routes, { prefix: '/data' });

server.listen({
  host: 'RENDER' in process.env ? `0.0.0.0` : `localhost`,
  port: 80,
});
