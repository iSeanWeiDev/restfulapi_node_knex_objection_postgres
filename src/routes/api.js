import express from 'express';
import { hasShopInfo } from '@app/middlewares';
import { appController, themeController, webhookController } from '@app/controllers';

const router = express.Router();

router.post('/setup', hasShopInfo, appController.setup);

router.get('/themes', hasShopInfo, themeController.load);
router.patch('/themes/:id', hasShopInfo, themeController.update);
router.delete('/themes/:id', hasShopInfo, themeController.delete);

router.get('/webhooks', hasShopInfo, webhookController.index);
router.post('/webhooks', hasShopInfo, webhookController.create);
router.delete('/webhooks', hasShopInfo, webhookController.delete);

export default router;
