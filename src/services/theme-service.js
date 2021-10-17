import { Shop } from '@app/models';

export const load = async (shopName) => {
  try {
    const result = await Shop.query()
      .findOne({ name: shopName })
      .withGraphFetched('[schedules, themes]');
    return result;
  } catch (error) {
    throw error;
  }
};
