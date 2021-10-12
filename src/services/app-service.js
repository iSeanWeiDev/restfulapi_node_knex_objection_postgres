import { NotFound } from 'http-errors';
import { Theme, Shop, Webhook } from '@app/models';
import { VAlIDATION_RESPONSE_CODE } from '@app/constants';
import { shopifyService } from '@app/services';

export const validate = async (shopName) => {
  try {
    const shop = await Shop.query().findOne({ name: shopName });
    if (!shop) {
      return VAlIDATION_RESPONSE_CODE['NOT_FOUND_SHOP'];
    }
    if (!shop.accessToken) {
      return VAlIDATION_RESPONSE_CODE['ACCESS_TOKEN_REQUIRED'];
    }

    const numberOfThemes = await Theme.query().where({ shopId: shop.id }).count();
    if (numberOfThemes === 0) {
      return VAlIDATION_RESPONSE_CODE['NOT_FOUND_THEMES'];
    }

    const numberOfWebhooks = await Webhook.query().where({ shopId: shop.id }).count();
    if (numberOfWebhooks === 0) {
      return VAlIDATION_RESPONSE_CODE['NOT_FOUND_WEBHOOKS'];
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const initialize = async (actionType, shopName) => {
  try {
    if (actionType === VAlIDATION_RESPONSE_CODE['NOT_FOUND_SHOP']) {
      return await Shop.query().insert({
        name: shopName
      });
    }

    if (actionType === VAlIDATION_RESPONSE_CODE['ACCESS_TOKEN_REQUIRED']) {
      const token = await shopifyService.genAccessToken(shopName);
      return await Shop.query().update({ accessToken: token }).where({ name: shopName });
    }

    if (actionType === VAlIDATION_RESPONSE_CODE['NOT_FOUND_THEMES']) {
      const shop = await Shop.query().findOne({ name: shopName });
      const retrievedTheems = await shopifyService.retrieveThemes(shopName, shop.accessToken);
      const insertData = retrievedTheems.body.themes.map((el) => ({
        name: el.name,
        description: '',
        tags: '',
        status: el.role === 'main' ? 'ACTIVATED' : 'NOT_READY',
        themeStoreId: el.theme_store_id.toString(),
        shopId: shopInfo.id,
        themeCreatedAt: el.created_at
      }));
      return await Theme.query().insert(insertData);
    }

    if (actionType === VAlIDATION_RESPONSE_CODE['NOT_FOUND_WEBHOOKS']) {
      const shop = await Shop.query().findOne({ name: shopName });
      const webhooks = await shopifyService.retrieveWebhooks(shopName, shop.accessToken);

      const insertData = webhooks.body.webhooks.map((el) => ({
        shopId: shop.id,
        type: el.topic,
        status: el.status
      }));
      return await Webhook.query().insert(insertData);
    }

    return true;
  } catch (error) {
    throw error;
  }
};
