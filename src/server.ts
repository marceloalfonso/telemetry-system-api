import express from 'express';
import dataRoutes from './routes/data.routes';
import { config } from 'dotenv';

config();

const server = express();

server.use(express.json());
server.use('/data', dataRoutes);

server.listen(80);
