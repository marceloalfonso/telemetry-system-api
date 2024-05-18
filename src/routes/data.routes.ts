import { Router } from 'express';
import DataRepository from '../modules/data-repository';

const dataRoutes = Router();
const dataRepository = new DataRepository();

dataRoutes.get('/upload', (req, res) => {
  dataRepository.upload(req, res);
});

dataRoutes.get('/fetch', (req, res) => {
  dataRepository.fetch(req, res);
});

export default dataRoutes;
