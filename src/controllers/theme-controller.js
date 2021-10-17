import { NotAcceptable } from 'http-errors';
import { themeService } from '@app/services';

const controller = {
  loadThemes: async (req, res) => {
    try {
      const { shopName } = req.body;
      if (!shopName) {
        const error = new NotAcceptable('Missing parameters on query.');
        throw error;
      }

      const themes = await themeService.load(shopName);
      res.status(200).json(themes);
    } catch (error) {
      throw error;
    }
  }
};

export default controller;
