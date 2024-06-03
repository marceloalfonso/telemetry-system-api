import { FastifyRequest, FastifyReply } from 'fastify';
import pool from './mysql';
import { z } from 'zod';

const dataSchema = z.object({
  temperature: z.string(),
  vibration: z.string(),
  sound: z.string(),
  current: z.string(),
  tension: z.string(),
});

const upload = (request: FastifyRequest, reply: FastifyReply) => {
  const { temperature, vibration, sound, current, tension } =
    request.query as z.infer<typeof dataSchema>;

  pool.getConnection((connectionError, databaseConnection) => {
    if (connectionError) {
      return reply
        .code(500)
        .type('application/json')
        .send('Erro ao conectar com o banco de dados');
    }

    databaseConnection.query(
      'INSERT into equipment (temperature, vibration, sound, current, tension) values (?, ?, ?, ?, ?)',
      [temperature, vibration, sound, current, tension],
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
};

const fetch = (request: FastifyRequest, reply: FastifyReply) => {
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
};

export { upload, fetch };
