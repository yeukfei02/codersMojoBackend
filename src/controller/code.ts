import * as Koa from 'koa';
const hackerEarth = require('hackerearth-node');

export const runCode = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const source = ctx.request.body.source;
  const lang = ctx.request.body.lang;

  if (source && lang) {
    const he = new hackerEarth(process.env.HACKEREARTH_CLIENT_SECRET_KEY, '0');
    const config = {
      time_limit: 5,
      memory_limit: 262144,
      source: source,
      input: '',
      language: lang,
    };

    const response = await he.run(config);
    const responseJSON = JSON.parse(response);

    ctx.response.status = 201;
    ctx.body = {
      message: 'runCode',
      result: responseJSON,
    };
  }
};
