import { NotAcceptable } from 'http-errors';
import { appService } from '@app/services';
import { VAlIDATION_RESPONSE_CODE } from '@app/constants';

const controller = {
  validate: async (req, res) => {
    try {
      const { shopName, accessToken } = req.shopInfo;

      const recursiveValidation = async (name, token) => {
        const result = await appService.validate(name);

        if (Object.keys(VAlIDATION_RESPONSE_CODE).includes(result)) {
          const statusOfInitialize = await appService.initialize(result, name, token);
          if (statusOfInitialize === VAlIDATION_RESPONSE_CODE['NOT_FOUND_API_WEBHOOK']) {
            return VAlIDATION_RESPONSE_CODE['NOT_FOUND_API_WEBHOOK'];
          }

          await recursiveValidation(name, token);
        }
      };

      const initializeResult = await recursiveValidation(shopName, accessToken);
      res.status(200).json({
        msg: initializeResult
      });
    } catch (error) {
      throw error;
    }
  }
};

export default controller;
