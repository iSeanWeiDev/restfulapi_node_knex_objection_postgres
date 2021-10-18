import { NotAcceptable } from 'http-errors';
import { themeService } from '@app/services';

const controller = {
  loadThemes: async (req, res) => {
    try {
      const { shopName } = req.shopInfo;
      const themes = await themeService.load(shopName);
      res.status(200).json(themes);
    } catch (error) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
  },
  deleteTheme: async (req, res) => {
    try {
      const { shopName, accessToken } = req.shopInfo;
      const { themeId } = req.params;
      const deleted = await themeService.remove(shopName, accessToken, themeId);
      return deleted;
    } catch (error) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
  }
};

export default controller;
