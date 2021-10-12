import { Webhook, Shop } from '@app/models';
import { ALLOWED_WEBHOOKS } from '../constants';
import { retrieveWebhooks, createWebhook } from './shopify-service';

export const initialize = async (shopName, accessToken) => {
  try {
    const shop = await Shop.query().findOne({ name: shopName });
    const storedHooks = await Webhook.query().where({ shopId: shop.id });
    if (storedHooks.length === 0) {
      await createWebhook(shop.name, accessToken, ALLOWED_WEBHOOKS.THEME_CREATE);
      // await createWebhook(shop.name, accessToken, ALLOWED_WEBHOOKS.THEME_PUBLISH);
      // await createWebhook(shop.name, accessToken, ALLOWED_WEBHOOKS.THEME_UPDATE);

      // const insertData = Object.keys(ALLOWED_WEBHOOKS).map((el) => ({
      //   shopId: shop.id,
      //   type: el,
      //   status: 'ACTIVATED'
      // }));

      // const hooks = await Webhook.query().insertAndFetch(insertData).returning('*');
      // return hooks;
    }

    // const response = await retrieveWebhooks(shop.name, accessToken);
    // const themeWebhooks = response.body.webhooks.filter((el) =>
    //   el.topic.split('/').includes('themes')
    // );

    // console.log(JSON.stringify(themeWebhooks, null, 2));

    return true;

    // Todo
    // 1. validate the current status of the hooks by shop.name
    //  1-1. if has a hook on the store, but does not have it on the database => remove the previous hook and create a new one and store it in the database.
    //  1-2. if hasn't hook on the store, and no have on database => create hooks and insert the historical data into the webhooks table.
    //  1-3. if hasn't hook on the store, and have the data in database => create a hook and update the existing row on the database
    // 2. returning data.
    //  2-1. if havnt any errors => return true
    //  2-2. if have the errors => create new error and throw it to controller
  } catch (error) {
    throw error;
  }
};
