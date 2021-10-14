import ShopifyToken from 'shopify-token';
import Shopify from 'shopify-api-node';

export const genAuthUrl = async (shopName) => {
  try {
    const redirectUri =
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:8000/callback'
        : 'http://localhost:8000/callback';

    const shopifyToken = new ShopifyToken({
      sharedSecret: process.env.SHOPIFY_API_SECRET,
      redirectUri: redirectUri,
      apiKey: process.env.SHOPIFY_API_KEY
    });

    const nonce = shopifyToken.generateNonce();
    const url = shopifyToken.generateAuthUrl(shopName, process.env.SCOPES, nonce);
    return url;
  } catch (error) {
    throw error;
  }
};

//   shopifyToken
//     .getAccessToken(shopName, 'bf6aec0c370060cfe22d146eefe929e3')
//     .then((data) => resolve(data))
//     .catch((error) => reject(error));

export const retrieveThemes = (shopName, accessToken) =>
  new Promise((resolve, reject) => {
    const shopify = new Shopify({
      shopName: shopName,
      accessToken: accessToken
    });

    shopify.theme
      .list()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

// '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'
export const retrieveWebhooks = (shopName, accessToken) =>
  new Promise((resolve, reject) => {
    const shopify = new Shopify({
      shopName: shopName,
      accessToken: accessToken
    });

    shopify.webhook
      .list()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

export const createWebhook = (topic, shopName, accessToken) =>
  new Promise((resolve, reject) => {
    const shopify = new Shopify({
      shopName: shopName,
      accessToken: accessToken
    });

    shopify.webhook
      .create({
        format: 'json',
        address: `${process.env.APP_HOST_NAME}/webhooks`,
        topic: topic
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

export const deleteWebhook = (shopName, accessToken, webhookId) =>
  new Promise((resolve, reject) => {
    const shopify = new Shopify({
      shopName: shopName,
      accessToken: accessToken
    });

    shopify.webhook
      .delete(webhookId)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

export const updateWebhook = (shopName, accessToken, webhookId, opts) =>
  new Promise((resolve, reject) => {
    const shopify = new Shopify({
      shopName: shopName,
      accessToken: accessToken
    });

    shopify.webhook
      .update(webhookId, opts)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
