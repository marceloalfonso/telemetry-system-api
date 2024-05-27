import { FastifyInstance } from 'fastify';
import Repository from './Repository';

const repository = new Repository();

const routes = async (server: FastifyInstance) => {
  server.get('/upload', (request, reply) => repository.upload(request, reply));
  server.get('/fetch', (request, reply) => repository.fetch(request, reply));
};

export default routes;
