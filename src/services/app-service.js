import { Theme, Shop, Webhook } from '@app/models';
import { VAlIDATION_RESPONSE_CODE, ALLOWED_WEBHOOKS } from '@app/constants';
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
    if (parseInt(numberOfThemes[0].count, 10) === 0) {
      return VAlIDATION_RESPONSE_CODE['NOT_FOUND_THEMES'];
    }

    const numberOfWebhooks = await Webhook.query().where({ shopId: shop.id }).count();
    if (parseInt(numberOfWebhooks[0].count, 10) === 0) {
      return VAlIDATION_RESPONSE_CODE['NOT_FOUND_WEBHOOKS'];
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const initialize = async (actionType, shopName, accessToken) => {
  try {
    if (actionType === VAlIDATION_RESPONSE_CODE['NOT_FOUND_SHOP']) {
      return await Shop.query().insert({
        name: shopName
      });
    }

    if (actionType === VAlIDATION_RESPONSE_CODE['ACCESS_TOKEN_REQUIRED']) {
      return await Shop.query().update({ accessToken: accessToken }).where({ name: shopName });
    }

    if (actionType === VAlIDATION_RESPONSE_CODE['NOT_FOUND_THEMES']) {
      const shop = await Shop.query().findOne({ name: shopName });
      const retrievedTheems = await shopifyService.retrieveThemes(shop.name, shop.accessToken);
      const insertData = retrievedTheems.map((el) => ({
        name: el.name,
        description: '',
        tags: '',
        status: el.role === 'main' ? 'ACTIVATED' : 'NOT_READY',
        themeStoreId: el.theme_store_id.toString(),
        shopId: shop.id,
        themeCreatedAt: el.created_at
      }));
      return await Theme.query().insert(insertData);
    }

    if (actionType === VAlIDATION_RESPONSE_CODE['NOT_FOUND_WEBHOOKS']) {
      const shop = await Shop.query().findOne({ name: shopName });
      const retrievedWebhoks = await shopifyService.retrieveWebhooks(shopName, accessToken);
      const filteredWebhooks = retrievedWebhoks.filter((el) => el.topic.split[0] === 'themes');
      if (filteredWebhooks.length > 0) {
        const insertData = filteredWebhooks.map((el) => {
          const idx = Object.values(ALLOWED_WEBHOOKS).indexOf(el.topic);
          return {
            shopId: shop.id,
            topic: Object.keys(ALLOWED_WEBHOOKS)[idx],
            apiWebhookId: el.id,
            address: el.address
          };
        });
        return await Webhook.query().insert(insertData);
      }

      return VAlIDATION_RESPONSE_CODE['NOT_FOUND_API_WEBHOOK'];
    }

    return true;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
