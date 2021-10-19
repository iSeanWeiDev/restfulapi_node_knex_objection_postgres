import { NotAcceptable } from 'http-errors';
import { appService } from '@app/services';
import { VAlIDATION_RESPONSE_CODE } from '@app/constants';

const controller = {
  validate: async (req, res) => {
    try {
      const { shopName, accessToken } = req.shopInfo;

      const recursiveValidation = async (name, token) => {
        const result = await appService.validate(name, token);

        if (Object.keys(VAlIDATION_RESPONSE_CODE).includes(result)) {
          await appService.initialize(result, name, token);
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
