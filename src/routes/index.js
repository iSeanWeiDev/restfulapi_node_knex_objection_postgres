import path from 'path';
import express from 'express';
import webhookHelper from '@app/utils/webhook-helper';
import apiRoutes from './api';

const router = express.Router();

// render hello world
router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../public/index.html'));
});

router.post('/webhooks', async (req, res) => {
  try {
    await webhookHelper(req);
    res.status(200).send();
  } catch (error) {
    res.status(411).send(error.message);
  }
});

router.use('/api', apiRoutes);

export default router;
