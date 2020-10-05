import * as Koa from 'koa';

import * as techSalaryService from '../service/techSalary';

export const createTechSalary = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const jobTitle = ctx.request.body.jobTitle;
  const company = ctx.request.body.company;
  const description = ctx.request.body.description;
  const totalCompensation = ctx.request.body.totalCompensation;
  const location = ctx.request.body.location;

  if (jobTitle && company && description && totalCompensation && location) {
    await techSalaryService.createTechSalary(jobTitle, company, description, totalCompensation, location);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createTechSalary',
    };
  }
};

export const getTechSalary = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const jobTitle = ctx.query.jobTitle;
  const company = ctx.query.company;
  const location = ctx.query.location;

  let techSalaryList = [];
  if (!jobTitle && !company && !location) {
    techSalaryList = await techSalaryService.getTechSalary();
  } else {
    techSalaryList = await techSalaryService.getTechSalaryByFilter(jobTitle, company, location);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getTechSalary',
    result: techSalaryList,
  };
};
