import { NotAcceptable } from 'http-errors';
import { appService } from '@app/services';
import { VAlIDATION_RESPONSE_CODE } from '@app/constants';

const controller = {
  validate: async (req, res) => {
    try {
      const { shopName, accessToken } = req.body;
      if (!shopName || !accessToken) {
        const error = new NotAcceptable('Missing parameters on query.');
        throw error;
      }
      const result = await appService.validate(shopName);
      await appService.initialize(result, shopName, accessToken);
      // await recursiveValidation(shopName);
      // const recursiveValidation = async (name) => {
      //   const result = await appService.validate(name);

      //   if (Object.keys(VAlIDATION_RESPONSE_CODE).includes(result)) {
      // await appService.initialize(result, name);
      // await recursiveValidation(name);
      //   }
      // };

      // await recursiveValidation(shopName);

      res.status(200).json({
        msg: `Successfully ${shopName} has been registered on our service.`
      });
    } catch (error) {
      throw error;
    }
  }
};

export default controller;
