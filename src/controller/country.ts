import Koa from 'koa';

import { getCountry } from '../service/country';

export const getCountryFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const countryList = await getCountry();

  ctx.response.status = 200;
  ctx.body = {
    message: 'getCountry',
    result: countryList,
  };
};
