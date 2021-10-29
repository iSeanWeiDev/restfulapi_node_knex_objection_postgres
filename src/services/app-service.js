import { Theme, Shop, Trigger } from '@app/models';
import { VAlIDATION_RESPONSE_CODE, ALLOWED_WEBHOOKS, TRIGGER_TYPES } from '@app/constants';
import { ShopifyProvider, AWSProvider } from '@app/providers';

export const validate = async (shopName) => {
  const shop = await Shop.query().findOne({ name: shopName });
  if (!shop) {
    return VAlIDATION_RESPONSE_CODE.NOT_FOUND_SHOP;
  }

  if (!shop.accessToken) {
    return VAlIDATION_RESPONSE_CODE.ACCESS_TOKEN_REQUIRED;
  }

  const numberOfThemes = await Theme.query().where({ shopId: shop.id }).count();
  if (parseInt(numberOfThemes[0].count, 10) === 0) {
    return VAlIDATION_RESPONSE_CODE.NOT_FOUND_THEMES;
  }

  const numberOfWebhooks = await Trigger.query()
    .where({ shopId: shop.id, type: TRIGGER_TYPES.WEBHOOK })
    .count();
  if (parseInt(numberOfWebhooks[0].count, 10) === 0) {
    return VAlIDATION_RESPONSE_CODE.NOT_FOUND_WEBHOOKS;
  }

  const numberOfScriptTags = await Trigger.query()
    .where({ shopId: shop.id, type: TRIGGER_TYPES.SCRIPT_TAG })
    .count();
  if (parseInt(numberOfScriptTags[0].count, 10) === 0) {
    return VAlIDATION_RESPONSE_CODE.NOT_FOUND_SCRIPT_TAGS;
  }

  return true;
};

const hasWebhookOnAPI = (array, topic) => {
  const idx = array.findIndex((el) => el.topic === topic);
  if (idx > -1) return true;
  return false;
};

export const initialize = async (actionType, shopName, accessToken) => {
  const shopifyProvider = new ShopifyProvider(shopName, accessToken);

  if (actionType === VAlIDATION_RESPONSE_CODE.NOT_FOUND_SHOP) {
    await Shop.query().insert({
      name: shopName,
      accessToken: accessToken
    });
    return true;
  }

  if (actionType === VAlIDATION_RESPONSE_CODE.ACCESS_TOKEN_REQUIRED) {
    await Shop.query().update({ accessToken: accessToken }).where({ name: shopName });
    return true;
  }

  if (actionType === VAlIDATION_RESPONSE_CODE.NOT_FOUND_THEMES) {
    const shop = await Shop.query().findOne({ name: shopName });
    const retrievedTheems = await shopifyProvider.retrieveThemes();
    const insertData = retrievedTheems.map((el) => ({
      shopId: shop.id,
      name: el.name,
      desc: '',
      tags: '',
      status: el.role === 'main' ? 'ACTIVATED' : 'NOT_READY',
      apiThemeId: `${el.id}`
    }));
    await Theme.query().insert(insertData);
    return true;
  }

  if (actionType === VAlIDATION_RESPONSE_CODE.NOT_FOUND_WEBHOOKS) {
    const shop = await Shop.query().findOne({ name: shopName });

    const apiWebhooks = await shopifyProvider.retrieveWebhooks();
    const filteredWebhooks = apiWebhooks.filter((el) =>
      ['themes', 'orders'].includes(el.topic.split('/')[0])
    );

    await Promise.all(
      Object.keys(ALLOWED_WEBHOOKS).map(async (key) => {
        if (!hasWebhookOnAPI(filteredWebhooks, ALLOWED_WEBHOOKS[key])) {
          const resFromApi = await shopifyProvider.createWebhook(ALLOWED_WEBHOOKS[key]);
          await Trigger.query().insert({
            shopId: shop.id,
            apiTriggerId: `${resFromApi.id}`,
            type: TRIGGER_TYPES.WEBHOOK,
            metadata: resFromApi
          });
        } else {
          const trigger = await Trigger.query().findOne({
            shopId: shop.id,
            type: TRIGGER_TYPES.WEBHOOK
          });
          if (!trigger) {
            const tmp = filteredWebhooks.find((el) => el.topic === ALLOWED_WEBHOOKS[key]);
            await Trigger.query().insert({
              shopId: shop.id,
              apiTriggerId: `${tmp.id}`,
              type: TRIGGER_TYPES.WEBHOOK,
              metadata: tmp
            });
          }
        }
      })
    );

    return true;
  }

  if (actionType === VAlIDATION_RESPONSE_CODE.NOT_FOUND_SCRIPT_TAGS) {
    const awsProvider = new AWSProvider();
    const shop = await Shop.query().findOne({ name: shopName });
    const apiScriptTags = await shopifyProvider.retrieveScripTags();
    const filtertedScriptTag = apiScriptTags.find((el) =>
      el.src.includes(process.env.AWS_S3_ASSET_NAME)
    );

    if (!filtertedScriptTag) {
      const scriptUrl = await awsProvider.uploadScriptTagToS3(shopName);
      const resFromApi = await shopifyProvider.createScriptTag(scriptUrl);

      await Trigger.query().insert({
        shopId: shop.id,
        apiTriggerId: `${resFromApi.id}`,
        type: TRIGGER_TYPES.SCRIPT_TAG,
        metadata: resFromApi
      });
    } else {
      const scriptTag = await Trigger.query().findOne({ apiTriggerId: `${filtertedScriptTag.id}` });
      if (!scriptTag) {
        await Trigger.query().insert({
          shopId: shop.id,
          apiTriggerId: `${filtertedScriptTag.id}`,
          type: TRIGGER_TYPES.SCRIPT_TAG,
          metadata: filtertedScriptTag
        });
      }
    }

    return true;
  }

  return true;
};
