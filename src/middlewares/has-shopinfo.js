import { NotAcceptable } from 'http-errors';

const hasShopInfo = async (req, res, next) => {
  try {
    const { shopname, accesstoken } = req.headers;
    if (!shopname || !accesstoken) {
      const error = new NotAcceptable('Missing parameters on query.');
      throw error;
    }
    const isDomainFormat = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
      shopname
    );
    if (!isDomainFormat) {
      const error = new NotAcceptable('Not valid domain');
      throw error;
    }

    if (!shopname.includes('myshopify.com')) {
      const error = new NotAcceptable('Not shopify app name');
      throw error;
    }

    req.shopInfo = { ...req.shopInfo, shopName: shopname, accessToken: accesstoken };
    next();
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message
    });
  }
};

export default hasShopInfo;
