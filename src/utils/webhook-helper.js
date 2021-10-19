import { NotAcceptable, NotFound } from 'http-errors';
import { ALLOWED_WEBHOOKS } from '@app/constants';
import { Shop, Theme } from '@app/models';

const exportEvent = (data) => {
  if (!data['x-shopify-shop-domain']) return false;
  if (!data['x-shopify-topic']) return false;

  return {
    shopName: data['x-shopify-shop-domain'],
    topic: data['x-shopify-topic']
  };
};

const webhookHelper = async (data) => {
  try {
    const event = exportEvent(data.headers);
    if (!event) {
      const error = new NotAcceptable('non-validated error');
      throw error;
    }

    if (Object.values(ALLOWED_WEBHOOKS).includes(event.topic)) {
      const shop = await Shop.query().findOne({ name: event.shopName });
      if (!shop) {
        const error = new NotFound('Not found the current store');
        throw error;
      }

      if (event.topic === ALLOWED_WEBHOOKS['THEME_CREATE']) {
        return await Theme.query().insert({
          name: data.body.name,
          description: '',
          tags: '',
          status: data.body.role === 'main' ? 'ACTIVATED' : 'NOT_READY',
          themeStoreId: data.body.theme_store_id.toString(),
          shopId: shop.id,
          themeCreatedAt: data.body.created_at
        });
      }

      if (event.topic === ALLOWED_WEBHOOKS['THEME_UPDATE']) {
        // To do
        return await Theme.query().updateAndFetchById(shop.id, {
          name: data.body.name,
          status: data.body.role === 'main' ? 'ACTIVATED' : 'NOT_READY',
          themeStoreId: data.body.theme_store_id.toString()
        });
      }

      if (event.topic === ALLOWED_WEBHOOKS['THEME_PUBLISH']) {
        // To do
        return await Theme.query().updateAndFetchById(shop.id, {
          status: data.body.role === 'main' ? 'ACTIVATED' : 'NOT_READY'
        });
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default webhookHelper;
