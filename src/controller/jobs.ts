import * as Koa from 'koa';

import * as jobsService from '../service/jobs';

export const createJobs = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const type = ctx.request.body.type;
  const department = ctx.request.body.department;
  const location = ctx.request.body.location;

  if (type && department && location) {
    await jobsService.createJobs(type, department, location);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createJobs',
    };
  }
};

export const getJobs = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const type = ctx.query.type;
  const department = ctx.query.department;
  const location = ctx.query.location;

  let jobsList = [];
  if (!type && !department && !location) {
    jobsList = await jobsService.getJobs();
  } else {
    jobsList = await jobsService.getJobsByFilter(type, department, location);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getJobs',
    result: jobsList,
  };
};
