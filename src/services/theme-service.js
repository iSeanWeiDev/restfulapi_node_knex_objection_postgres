import { Shop, Theme } from '@app/models';

export const load = async (shopName) => {
  try {
    const shop = await Shop.query().findOne({ name: shopName });

    const themes = await Theme.query().where({ shopId: shop.id }).returning('*');

    return themes;
  } catch (error) {
    throw error;
  }
};
