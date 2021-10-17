import { NotAcceptable } from 'http-errors';

const shopNameValidator = async (req, res, next) => {
  try {
    const { shopName, accessToken } = req.body;
    if (!shopName || !accessToken) {
      const error = new NotAcceptable('Missing parameters on query.');
      throw error;
    }
    const isDomainFormat = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(shopName); 
    if (!isDomainFormat) {
      const error = new NotAcceptable('Not valid domain');
      throw error;
    }

    if (!shopName.includes('myshopify.com')) {
      const error = new NotAcceptable('Not shopify app name');
      throw error;
    }
    next();
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message
    });
  }
};

export default shopNameValidator;