import { NotAcceptable } from 'http-errors';
import { appService } from '@app/services';
import { VAlIDATION_RESPONSE_CODE } from '@app/constants';

const controller = {
  validate: async (req, res) => {
    try {
      const { shopName } = req.body;
      if (!shopName) {
        const error = new NotAcceptable('Missing parameters on query.');
        throw error;
      }

      const recursiveValidation = async (name) => {
        const result = await appService.validate(name);

        if (Object.keys(VAlIDATION_RESPONSE_CODE).includes(result)) {
          await appService.initialize(name);
          await recursiveValidation(name);
        }
      };

      await recursiveValidation(shopName);

      res.status(200).json({
        msg: `Successfully ${shopName} has been registered on our service.`
      });
    } catch (error) {
      throw error;
    }
  }
};

export default controller;
