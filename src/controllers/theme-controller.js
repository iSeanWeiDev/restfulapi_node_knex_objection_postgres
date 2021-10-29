import { themeService } from '@app/services';
import { NotAcceptable } from 'http-errors';

const controller = {
  load: async (req, res) => {
    try {
      const { shopName } = req.shopInfo;
      const themes = await themeService.load(shopName);
      return res.status(200).json(themes);
    } catch (error) {
      return res.status(411).json({ msg: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { startAt, endAt } = req.body;
      if (!id || !startAt) {
        const error = new NotAcceptable('Missing parameter on request.');
        throw error;
      }

      const updatedTheme = await themeService.updateTheme(id, { startAt, endAt });
      return res.status(200).json(updatedTheme);
    } catch (error) {
      return res.status(411).json({ msg: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { shopName, accessToken } = req.shopInfo;
      const { id } = req.params;
      const deleted = await themeService.remove(shopName, accessToken, id);
      return res.status(204).json({ data: deleted });
    } catch (error) {
      return res.status(411).json({ msg: error.message });
    }
  }
};

export default controller;
