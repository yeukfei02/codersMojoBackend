import Koa from 'koa';

import { createHackathons, getHackathons, getHackathonsByFilter } from '../service/hackathons';

export const createHackathonsFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const name = ctx.request.body.name;
  const mode = ctx.request.body.mode;
  const prize = ctx.request.body.prize;
  const details = ctx.request.body.details;
  const dateTime = ctx.request.body.dateTime;
  const link = ctx.request.body.link;

  if (name && mode && prize && details && dateTime && link) {
    await createHackathons(name, mode, prize, details, dateTime, link);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createHackathons',
    };
  }
};

export const getHackathonsFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const name = ctx.query.name;

  let hackathonsList = [];
  if (!name) {
    hackathonsList = await getHackathons();
  } else {
    hackathonsList = await getHackathonsByFilter(name);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getHackathons',
    result: hackathonsList,
  };
};
