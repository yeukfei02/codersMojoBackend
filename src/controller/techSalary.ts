import * as Koa from 'koa';

import * as techSalaryService from '../service/techSalary';

export const createTechSalary = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const jobTitle = ctx.request.body.jobTitle;
  const company = ctx.request.body.company;
  const description = ctx.request.body.description;
  const totalCompensation = ctx.request.body.totalCompensation;

  if (jobTitle && company && description && totalCompensation) {
    await techSalaryService.createTechSalary(jobTitle, company, description, totalCompensation);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createTechSalary',
    };
  }
};

export const getTechSalary = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const jobTitle = ctx.query.jobTitle;
  const company = ctx.query.company;

  let techSalaryList = [];
  if (!jobTitle && !company) {
    techSalaryList = await techSalaryService.getTechSalary();
  } else {
    techSalaryList = await techSalaryService.getTechSalaryByFilter(jobTitle, company);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getTechSalary',
    result: techSalaryList,
  };
};
