import express from 'express';
import { appController, themeController, scheduleController } from '@app/controllers';

const router = express.Router();

router.post('/validate', appController.validate);
router.get('/themes', themeController.loadThemes);
router.patch('/schedule/:id', scheduleController.update);

export default router;
