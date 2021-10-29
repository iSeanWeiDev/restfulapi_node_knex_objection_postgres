import { Shop } from '@app/models';

export const validate = async (shopName) => {
  const shop = await Shop.query().findOne({ name: shopName });

  if (!shop) return false;
  return true;
};

export const create = async (shopName) => {
  const shop = await Shop.query().insert({
    name: shopName
  });

  return shop;
};
