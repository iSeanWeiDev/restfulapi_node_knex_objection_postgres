import { Shop, Theme } from '@app/models';
import { shopifyService } from '@app/services';

export const load = async (shopName) => {
  try {
    const shop = await Shop.query().findOne({ name: shopName });

    const themes = await Theme.query().where({ shopId: shop.id }).returning('*');

    return themes;
  } catch (error) {
    throw error;
  }
};

export const remove = async (shopName, accessToken, themeId) => {
  try {
    const theme = await Theme.query().findById(themeId);
    console.log(shopName, accessToken, theme);
    const resDel = await shopifyService.deleteTheme(shopName, accessToken, theme.themeStoreId);
    if (resDel) await Theme.query().deleteById(themeId);
    return true;
  } catch (error) {
    throw error;
  }
};
