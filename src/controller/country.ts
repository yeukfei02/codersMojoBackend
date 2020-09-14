import * as Koa from 'koa';

import * as countryService from '../service/country';

export const getCountry = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const countryList = await countryService.getCountry();

  ctx.response.status = 200;
  ctx.body = {
    message: 'getCountry',
    result: countryList,
  };
};
