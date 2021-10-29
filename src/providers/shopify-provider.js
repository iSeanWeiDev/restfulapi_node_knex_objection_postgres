import Shopify from 'shopify-api-node';

class ShopifyProvider {
  constructor(shopName, accessToken) {
    this.shopify = new Shopify({
      shopName: shopName,
      accessToken: accessToken
    });
  }

  retrieveThemes() {
    return new Promise((resolve, reject) => {
      this.shopify.theme
        .list()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  modifyTheme(id, params) {
    return new Promise((resolve, reject) => {
      this.shopify.theme
        .update(id, params)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  deleteTheme(id) {
    return new Promise((resolve, reject) => {
      this.shopify.theme
        .delete(Number(id))
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  retrieveWebhooks() {
    return new Promise((resolve, reject) => {
      this.shopify.webhook
        .list()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  createWebhook(topic) {
    return new Promise((resolve, reject) => {
      this.shopify.webhook
        .create({
          format: 'json',
          address: `${process.env.APP_HOST_NAME}/webhooks`,
          topic: topic
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  updateWebhook(id, opts) {
    return new Promise((resolve, reject) => {
      this.shopify.webhook
        .update(id, opts)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  deleteWebhook(id) {
    return new Promise((resolve, reject) => {
      this.shopify.webhook
        .delete(id)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  retrieveScripTags() {
    return new Promise((resolve, reject) => {
      this.shopify.scriptTag
        .list()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  createScriptTag(fileLocation) {
    return new Promise((resolve, reject) => {
      this.shopify.scriptTag
        .create({
          event: 'onload',
          src: fileLocation,
          display_scope: 'all',
          cache: true
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  deleteScriptTag(id) {
    return new Promise((resolve, reject) => {
      this.shopify.scriptTag
        .delete(Number(id))
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}

export default ShopifyProvider;
