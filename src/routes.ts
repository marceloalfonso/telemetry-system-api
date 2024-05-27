import { FastifyInstance } from 'fastify';
import { upload, fetch } from './repository';

const routes = async (server: FastifyInstance) => {
  server.get('/upload', (request, reply) => upload(request, reply));
  server.get('/fetch', (request, reply) => fetch(request, reply));
};

export default routes;
