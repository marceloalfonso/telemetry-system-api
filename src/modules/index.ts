import { FastifyRequest, FastifyReply } from 'fastify';
import pool from '../databases';
import { z } from 'zod';

const dataSchema = z.object({
  temperature: z.string(),
  vibration: z.string(),
  sound: z.string(),
  current: z.string(),
});

class Repository {
  upload(request: FastifyRequest, reply: FastifyReply) {
    const { temperature, vibration, sound, current } = request.query as z.infer<
      typeof dataSchema
    >;

    pool.getConnection((connectionError, databaseConnection) => {
      if (connectionError) {
        return reply
          .code(500)
          .type('application/json')
          .send('Erro ao conectar com o banco de dados');
      }

      databaseConnection.query(
        'INSERT into equipment (temperature, vibration, sound, current) values (?, ?, ?, ?)',
        [temperature, vibration, sound, current],
        (queryExecutionError, _data, _fields) => {
          databaseConnection.release();

          if (queryExecutionError) {
            return reply
              .code(500)
              .type('application/json')
              .send('Erro ao inserir os dados');
          }

          return reply
            .code(200)
            .type('application/json')
            .send('Dados inseridos com sucesso');
        }
      );
    });
  }

  fetch(request: FastifyRequest, reply: FastifyReply) {
    pool.getConnection((connectionError, databaseConnection) => {
      if (connectionError) {
        return reply
          .code(500)
          .type('application/json')
          .send('Erro ao conectar com o banco de dados');
      }

      databaseConnection.query(
        'SELECT * FROM (SELECT * FROM equipment ORDER BY id DESC LIMIT 20) sub ORDER BY id ASC',
        (queryExecutionError, data, _fields) => {
          databaseConnection.release();

          if (queryExecutionError) {
            return reply
              .code(500)
              .type('application/json')
              .send('Erro ao exibir os dados');
          }

          return reply.code(200).type('application/json').send(data);
        }
      );
    });
  }
}

export default Repository;
