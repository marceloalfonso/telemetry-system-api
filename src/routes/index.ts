import { Router } from 'express';
import Repository from '../modules';

const router = Router();
const repository = new Repository();

router.get('/upload', (req, res) => {
  repository.upload(req, res);
});

router.get('/fetch', (req, res) => {
  repository.fetch(req, res);
});

export default router;
