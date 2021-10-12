import { Shop } from '@app/models';

export const validate = async (shopName) => {
  try {
    const shop = await Shop.query().findOne({ name: shopName });

    if (!shop) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

export const create = async (shopName) => {
  try {
    const shop = await Shop.query().insert({
      name: shopName
    });

    return shop;
  } catch (error) {
    throw error;
  }
};
