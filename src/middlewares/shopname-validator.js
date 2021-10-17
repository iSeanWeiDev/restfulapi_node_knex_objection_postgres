import { NotAcceptable } from 'http-errors';
const shopNameValidator = async (req, res, next) => {
  try {
    // todo
    // 1. has req.header.shopName =>
    // 1-1 if true => go validtor
    // 1-2 if false => return status
    // 2. validator
    // 2-1 has name => it should be looks like "*.myshopify.com" => string.includes('myshopify.com)
    // 2-2 hasnt name => create new error for validation
    // if (!canUseShop) {
    //   const error = new NotAcceptable('Missing parameters on request query');
    //   throw error;
    // }
    next();
  } catch (error) {
    res.status(error.statusCode).json({
      msg: error.message
    });
  }
};

export default shopNameValidator;
