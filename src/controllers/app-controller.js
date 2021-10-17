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

      const recursiveValidation = async (name, token) => {
        const result = await appService.validate(name);

        if (Object.keys(VAlIDATION_RESPONSE_CODE).includes(result)) {
          const res = await appService.initialize(result, name, token);
          if (res === VAlIDATION_RESPONSE_CODE['NOT_FOUND_API_WEBHOOK']) {
            return;
          }

          await recursiveValidation(name, token);
        }
      };

      await recursiveValidation(shopName, accessToken);

      res.status(200).json({
        msg: `Successfully ${shopName} has been registered on our service.`
      });
    } catch (error) {
      throw error;
    }
  }
};

export default controller;
