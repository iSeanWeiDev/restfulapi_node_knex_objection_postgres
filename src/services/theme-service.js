import { Theme } from '@app/models';

export const load = async (shopName) => {
  try {
    const result = await Theme.query().where({ name: shopName }).withGraphFetched('[themes]');
  } catch (error) {
    throw error;
  }
};
