import { appService } from '@app/services';
import { VAlIDATION_RESPONSE_CODE } from '@app/constants';

const controller = {
  setup: async (req, res) => {
    const { shopName, accessToken } = req.shopInfo;

    const recursiveValidation = async (name, token) => {
      const result = await appService.validate(name, token);

      if (Object.keys(VAlIDATION_RESPONSE_CODE).includes(result)) {
        await appService.initialize(result, name, token);
        await recursiveValidation(name, token);
      }
    };

    const setResult = await recursiveValidation(shopName, accessToken);

    return res.status(200).json({
      msg: setResult
    });
  }
};

export default controller;
