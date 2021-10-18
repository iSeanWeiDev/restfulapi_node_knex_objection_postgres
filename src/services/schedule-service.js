import { Shop, Schedule } from '@app/models';

export const load = async (shopName) => {
  try {
    const shop = await Shop.query().findOne({ name: shopName });
    const schedules = await Schedule.query().where({ shopId: shop.id }).returning('*');

    return schedules;
  } catch (error) {
    throw error;
  }
};

export const updateSchedule = async (shopName, themeId, startAt) => {
  try {
    const shop = await Shop.query().findOne({ name: shopName });
    const schedule = await Schedule.query().findOne({
      themeId: themeId,
      shopId: shop.id
    });

    if (!schedule) {
      const newSchedule = await Schedule.query().insertAndFetch({
        startAt: new Date(startAt),
        themeId: themeId,
        shopId: shop.id
      });
      return newSchedule;
    }

    const updatedSchedule = await Schedule.query().updateAndFetchById(schedule.id, {
      startAt: new Date(startAt)
    });

    return updatedSchedule;
  } catch (error) {
    throw error;
  }
};
