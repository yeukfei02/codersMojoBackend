import * as Koa from 'koa';

import * as hackathonsService from '../service/hackathons';

export const createHackathons = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const name = ctx.request.body.name;
  const mode = ctx.request.body.mode;
  const prize = ctx.request.body.prize;
  const details = ctx.request.body.details;

  if (name && mode && prize && details) {
    await hackathonsService.createHackathons(name, mode, prize, details);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createHackathons',
    };
  }
};

export const getHackathons = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const name = ctx.query.name;

  let hackathonsList = [];
  if (!name) {
    hackathonsList = await hackathonsService.getHackathons();
  } else {
    hackathonsList = await hackathonsService.getHackathonsByFilter(name);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getHackathons',
    result: hackathonsList,
  };
};
