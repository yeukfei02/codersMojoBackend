import Koa from 'koa';

import { createTechSalary, getTechSalary, getTechSalaryByFilter } from '../service/techSalary';

export const createTechSalaryFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const jobTitle = ctx.request.body.jobTitle;
  const company = ctx.request.body.company;
  const description = ctx.request.body.description;
  const totalCompensation = ctx.request.body.totalCompensation;
  const location = ctx.request.body.location;

  if (jobTitle && company && description && totalCompensation && location) {
    await createTechSalary(jobTitle, company, description, totalCompensation, location);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createTechSalary',
    };
  }
};

export const getTechSalaryFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const jobTitle = ctx.query.jobTitle;
  const company = ctx.query.company;
  const location = ctx.query.location;

  let techSalaryList = [];
  if (!jobTitle && !company && !location) {
    techSalaryList = await getTechSalary();
  } else {
    techSalaryList = await getTechSalaryByFilter(jobTitle, company, location);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getTechSalary',
    result: techSalaryList,
  };
};
