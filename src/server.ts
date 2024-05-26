import routes from './routes';
import fastify from 'fastify';

const server = fastify();

server.register(routes, { prefix: '/data' });

server.listen({ port: 80 });
