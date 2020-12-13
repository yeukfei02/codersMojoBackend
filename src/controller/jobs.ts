import Koa from 'koa';

import { createJobs, getJobs, getJobsByFilter } from '../service/jobs';

export const createJobsFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const type = ctx.request.body.type;
  const company = ctx.request.body.company;
  const companyUrl = ctx.request.body.companyUrl;
  const department = ctx.request.body.department;
  const location = ctx.request.body.location;
  const title = ctx.request.body.title;
  const description = ctx.request.body.description;
  const url = ctx.request.body.url;

  if (type && department && location && title && description) {
    await createJobs(type, company, companyUrl, department, location, title, description, url);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createJobs',
    };
  }
};

export const getJobsFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const type = ctx.query.type;
  const department = ctx.query.department;
  const location = ctx.query.location;

  let jobsList = [];
  if (!type && !department && !location) {
    jobsList = await getJobs();
  } else {
    jobsList = await getJobsByFilter(type, department, location);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getJobs',
    result: jobsList,
  };
};
