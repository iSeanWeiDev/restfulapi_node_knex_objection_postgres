import { Shop, Theme } from '@app/models';
import { ShopifyProvider } from '@app/providers';
import { THEME_STATUS } from '@app/constants';

export const load = async (shopName) => {
  const shop = await Shop.query().findOne({ name: shopName });

  const themes = await Theme.query().where({ shopId: shop.id }).returning('*');

  return themes;
};

export const updateTheme = async (themeId, payload) => {
  const theme = await Theme.query()
    .updateAndFetchById(themeId, { scheduledAt: payload.startAt, status: THEME_STATUS.SCHEDULED })
    .returning('*');

  return theme;
};

export const remove = async (shopName, accessToken, themeId) => {
  const shopifyProvider = new ShopifyProvider(shopName, accessToken);

  const theme = await Theme.query().findById(themeId);
  await shopifyProvider.deleteTheme(theme.apiThemeId);
  const deltedTheme = await Theme.query().deleteById(themeId);
  return deltedTheme;
};
