import path from 'path';
import express from 'express';
import apiRoutes from './api';

const router = express.Router();

// render hello world
router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/callback', (req, res) => {
  console.log(req.query);
});

router.use('/api', apiRoutes);

export default router;
