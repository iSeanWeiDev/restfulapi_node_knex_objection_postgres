import express from 'express';
import { hasShopInfo } from '@app/middlewares';
import {
  appController,
  themeController,
  scheduleController,
  webhookController
} from '@app/controllers';

const router = express.Router();

router.post('/validate', hasShopInfo, appController.validate);

router.get('/themes', hasShopInfo, themeController.loadThemes);
router.delete('/themes/:themeId', hasShopInfo, themeController.deleteTheme);

router.get('/schedules', hasShopInfo, scheduleController.loadSchedules);
router.patch('/schedules/:themeId', hasShopInfo, scheduleController.updateSchedule);

router.get('/webhooks', hasShopInfo, webhookController.index);
router.post('/webhooks', hasShopInfo, webhookController.create);
router.delete('/webhooks', hasShopInfo, webhookController.delete);

export default router;
