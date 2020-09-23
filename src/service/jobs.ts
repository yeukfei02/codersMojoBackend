import { PrismaClient, jobs } from '@prisma/client';

const prisma = new PrismaClient();

export const createJobs = async (
  type: string,
  company: string,
  companyUrl: string,
  department: string,
  location: string,
  title: string,
  description: string,
  url: string,
): Promise<void> => {
  await prisma.jobs.create({
    data: {
      type: type ? type : '',
      company: company ? company : '',
      company_url: companyUrl ? companyUrl : '',
      department: department ? department : '',
      location: location ? location : '',
      title: title ? title : '',
      description: description ? description : '',
      url: url ? url : '',
    },
  });
};

export const getJobs = async (): Promise<jobs[]> => {
  const jobsList = await prisma.jobs.findMany({});
  return jobsList;
};

export const getJobsByFilter = async (type: string, department: string, location: string): Promise<jobs[]> => {
  const jobsList = await prisma.jobs.findMany({
    where: {
      type: type,
      department: department,
      location: location,
    },
  });
  return jobsList;
};

export const getJobsByCompanyAndTitle = async (company: string, title: string): Promise<jobs[]> => {
  const job = await prisma.jobs.findMany({
    where: {
      company: company,
      title: title,
    },
    take: 1,
  });
  return job;
};
