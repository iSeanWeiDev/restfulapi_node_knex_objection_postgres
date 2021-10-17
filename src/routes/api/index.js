import express from 'express';
import { appController, themeController, scheduleController } from '@app/controllers';
import { shopNameValidator } from '@app/middlewares';

const router = express.Router();

router.post('/validate', shopNameValidator, appController.validate);
router.get('/themes', shopNameValidator, themeController.loadThemes);
router.patch('/schedule/:id', shopNameValidator, scheduleController.update);

export default router;
