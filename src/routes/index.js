import path from 'path';
import express from 'express';
import { webhookHelper, openPixelHelper } from '@app/helpers';
import apiRoutes from './api';

const router = express.Router();

// render hello world
router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/openpixel', async (req, res) => {
  await openPixelHelper(req);
  res.status(200).send();
});

router.post('/webhooks', async (req, res) => {
  await webhookHelper(req);
  res.status(200).send();
});

router.use('/api', apiRoutes);

export default router;
