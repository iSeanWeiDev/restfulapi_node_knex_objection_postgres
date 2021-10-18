import express from 'express';
import { hasShopInfo } from '@app/middlewares';
import { appController, themeController, scheduleController } from '@app/controllers';

const router = express.Router();

router.post('/validate', hasShopInfo, appController.validate);
router.get('/themes', hasShopInfo, themeController.loadThemes);
router.get('/schedules', hasShopInfo, scheduleController.loadSchedules);

export default router;
