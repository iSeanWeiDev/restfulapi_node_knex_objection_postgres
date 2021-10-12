import express from 'express';
import { appController, themeController } from '@app/controllers';

const router = express.Router();

router.post('/validate', appController.validate);
router.get('/themes', themeController.loadThemes);

export default router;
