import { Shop, Theme, Log } from '@app/models';
import { ALLOWED_WEBHOOKS, THEME_STATUS, LOG_TYPES } from '@app/constants';

const exportEvent = (data) => {
  if (!data['x-shopify-shop-domain']) return null;
  if (!data['x-shopify-topic']) return null;

  return {
    shopName: data['x-shopify-shop-domain'],
    topic: data['x-shopify-topic']
  };
};

const webhookHelper = async (data) => {
  const event = exportEvent(data.headers);
  if (!event || !Object.values(ALLOWED_WEBHOOKS).includes(event.topic)) {
    await Log.query().insert({
      type: LOG_TYPES.INVALID_HOOK_DATTA,
      metadata: data.body
    });

    return null;
  }

  const shop = await Shop.query().findOne({ name: event.shopName });
  if (!shop) {
    await Log.query().insert({
      type: LOG_TYPES.INVALID_HOOK_DATTA,
      metadata: data.body
    });

    return null;
  }

  if (event.topic === ALLOWED_WEBHOOKS.THEME_CREATE) {
    await Theme.query().insert({
      name: data.body.name,
      shopId: shop.id,
      desc: '',
      tags: '',
      apiThemeId: `${data.body.id}`,
      status: data.body.role === 'main' ? THEME_STATUS.ACTIVATED : THEME_STATUS.NOT_READY
    });

    return true;
  }

  if (event.topic === ALLOWED_WEBHOOKS.THEME_UPDATE) {
    await Theme.query().updateAndFetchById(shop.id, {
      name: data.body.name,
      status: data.body.role === 'main' ? THEME_STATUS.ACTIVATED : THEME_STATUS.NOT_READY
    });
    return true;
  }

  if (event.topic === ALLOWED_WEBHOOKS.THEME_PUBLISH) {
    await Theme.query()
      .update({ status: THEME_STATUS.ACTIVATED })
      .where({ apiThemeId: `${data.body.id}` });

    return true;
  }

  if (event.topic === ALLOWED_WEBHOOKS.THEME_DELETE) {
    await Theme.query()
      .delete()
      .where({ apiThemeId: `${data.body.id}` });

    return true;
  }

  if (event.topic === ALLOWED_WEBHOOKS.ORDER_PAID) {
    console.log(data.body);
  }

  return true;
};

export default webhookHelper;
