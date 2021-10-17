import { scheduleService } from '@app/services';

const controller = {
  getOne: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        const error = new NotAcceptable('Missing parameters on query.');
        throw error;
      }

      const schedule = await scheduleService.getOne(id);
      return res.status(200).json(schedule);
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { shopName, startAt, themeId } = req.body;
      if (!shopName || !startAt || !themeId) {
        const error = new NotAcceptable('Missing parameters on query.');
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
