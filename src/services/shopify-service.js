import config from '@app/config';
import ShopifyToken from 'shopify-token';
import Shopify from 'shopify-api-node';

export const genAccessToken = (shopName) =>
  new Promise((resolve, reject) => {
    const shopifyToken = new ShopifyToken({
      sharedSecret: config.SHOPIFY_API_SECRET,
      redirectUri: 'http://localhost:8000/callback',
      apiKey: config.SHOPIFY_API_KEY
    });

    // const nonce = shopifyToken.generateNonce();
    // console.log(nonce);
    // const url = shopifyToken.generateAuthUrl('gate4life2', config.SCOPES, nonce);
    shopifyToken
      .getAccessToken(shopName, 'b8e591497a5a91c67b1f9cebcbc62a50')
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

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
