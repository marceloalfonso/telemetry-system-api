import { Request, Response } from 'express';
import pool from '../databases';

class Repository {
  upload(req: Request, res: Response) {
    const { temperature, vibration, sound, current } = req.query;

    pool.getConnection((connectionError, databaseConnection) => {
      if (connectionError) {
        return res.status(500).json('Erro ao conectar com o banco de dados');
      }

      databaseConnection.query(
        'INSERT into equipment (temperature, vibration, sound, current) values (?, ?, ?, ?)',
        [temperature, vibration, sound, current],
        (queryExecutionError, _data, _fields) => {
          databaseConnection.release();

          if (queryExecutionError) {
            return res.status(500).json('Erro ao inserir os dados');
          }

          return res.status(200).json('Dados inseridos com sucesso');
        }
      );
    });
  }

  fetch(req: Request, res: Response) {
    pool.getConnection((connectionError, databaseConnection) => {
      if (connectionError) {
        return res.status(500).json('Erro ao conectar com o banco de dados');
      }

      databaseConnection.query(
        'SELECT * FROM (SELECT * FROM equipment ORDER BY id DESC LIMIT 20) sub ORDER BY id ASC',
        (queryExecutionError, data, _fields) => {
          databaseConnection.release();

          if (queryExecutionError) {
            return res.status(500).json('Erro ao exibir os dados');
          }

          return res.status(200).json(data);
        }
      );
    });
  }
}

export default Repository;
