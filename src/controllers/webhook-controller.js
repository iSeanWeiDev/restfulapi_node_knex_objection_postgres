import { shopifyService } from '@app/services';
const controller = {
  create: async (req, res) => {
    try {
      const { shopName, accessToken } = req.shopInfo;
      const webhook = await shopifyService.createWebhook('themes/publish', shopName, accessToken);
      return res.status(201).json(webhook);
    } catch (error) {
      res.status(500).json({
        msg: error.message
      });
    }
  },
  index: async (req, res) => {
    try {
      const { shopName, accessToken } = req.shopInfo;
      const webhooks = await shopifyService.retrieveWebhooks(shopName, accessToken);
      return res.status(201).json({
        data: webhooks
      });
    } catch (error) {
      res.status(error.statusCode).json({
        msg: error.message
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { shopName, accessToken } = req.shopInfo;
      const { apiWebhookId } = req.body;
      const webhooks = await shopifyService.deleteWebhook(shopName, accessToken, apiWebhookId);
      return res.status(200).json({
        data: webhooks
      });
    } catch (error) {
      console.log(error);
      res.status(511).json({
        msg: error.message
      });
    }
  }
};

export default controller;
