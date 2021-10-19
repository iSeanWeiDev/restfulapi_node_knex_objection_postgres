import { Theme, Shop, Webhook } from '@app/models';
import { VAlIDATION_RESPONSE_CODE, ALLOWED_WEBHOOKS } from '@app/constants';
import { shopifyService } from '@app/services';

export const validate = async (shopName, accessToken) => {
  try {
    const shop = await Shop.query().findOne({ name: shopName });
    if (!shop) {
      return VAlIDATION_RESPONSE_CODE['NOT_FOUND_SHOP'];
    }

    if (!shop.accessToken) {
      return VAlIDATION_RESPONSE_CODE['ACCESS_TOKEN_REQUIRED'];
    }

    if (shop.accessToken !== accessToken) {
      return VAlIDATION_RESPONSE_CODE['ACCESS_TOKEN_NOT_MATCH'];
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

const hasWebhookOnAPI = (array, topic) => {
  const idx = array.findIndex((el) => el.topic === topic);
  if (idx > -1) return true;
  return false;
};

export const initialize = async (actionType, shopName, accessToken) => {
  try {
    if (actionType === VAlIDATION_RESPONSE_CODE['NOT_FOUND_SHOP']) {
      return await Shop.query().insert({
        name: shopName,
        accessToken: accessToken
      });
    }

    if (
      actionType === VAlIDATION_RESPONSE_CODE['ACCESS_TOKEN_REQUIRED'] ||
      actionType === VAlIDATION_RESPONSE_CODE['ACCESS_TOKEN_NOT_MATCH']
    ) {
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
      const filteredWebhooks = retrievedWebhoks.filter((el) => el.topic.split('/')[0] === 'themes');
      await Promise.all(
        Object.keys(ALLOWED_WEBHOOKS).map(async (key) => {
          if (!hasWebhookOnAPI(filteredWebhooks, ALLOWED_WEBHOOKS[key])) {
            const resFromApi = await shopifyService.createWebhook(
              ALLOWED_WEBHOOKS[key],
              shopName,
              accessToken
            );
            await Webhook.query().insert({
              shopId: shop.id,
              topic: key,
              apiWebhookId: `${resFromApi.id}`,
              address: resFromApi.address
            });
          } else {
            const webhook = await Webhook.query().findOne({
              shopId: shop.id,
              topic: key
            });
            if (!webhook) {
              const tmp = filteredWebhooks.find((el) => el.topic === ALLOWED_WEBHOOKS[key]);
              await Webhook.query().insert({
                shopId: shop.id,
                topic: key,
                apiWebhookId: `${tmp.id}`,
                address: tmp.address
              });
            }
          }
        })
      );

      return true;
    }

    return true;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
