import { NotAcceptable } from 'http-errors';
import { scheduleService } from '@app/services';

const controller = {
  loadSchedules: async (req, res) => {
    try {
      const { shopName } = req.shopInfo;

      const schedules = await scheduleService.load(shopName);

      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const { shopName } = req.shopInfo;
      const { themeId } = req.params;
      const { startAt, endAt } = req.body;
      if (!startAt) {
        const error = new NotAcceptable('Missing parameters');
        throw error;
      }

      const updatedSchedule = await scheduleService.updateSchedule(shopName, themeId, startAt);
      return res.status(200).json(updatedSchedule);
    } catch (error) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
  }
};

export default controller;
