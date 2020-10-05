import { PrismaClient, tech_salary } from '@prisma/client';

const prisma = new PrismaClient();

export const createTechSalary = async (
  jobTitle: string,
  company: string,
  description: string,
  totalCompensation: string,
  location: string,
): Promise<void> => {
  await prisma.tech_salary.create({
    data: {
      job_title: jobTitle ? jobTitle : '',
      company: company ? company : '',
      description: description ? description : '',
      total_compensation: totalCompensation ? totalCompensation : '',
      location: location ? location : '',
    },
  });
};

export const getTechSalary = async (): Promise<tech_salary[]> => {
  const techSalaryList = await prisma.tech_salary.findMany({
    orderBy: {
      company: 'asc',
    },
  });
  return techSalaryList;
};

export const getTechSalaryByFilter = async (jobTitle: string, company: string): Promise<tech_salary[]> => {
  const techSalaryList = await prisma.tech_salary.findMany({
    where: {
      job_title: jobTitle,
      company: company,
    },
    orderBy: {
      company: 'asc',
    },
  });
  return techSalaryList;
};

export const getTechSalaryByJobTitleAndCompany = async (jobTitle: string, company: string): Promise<tech_salary[]> => {
  const techSalaryList = await prisma.tech_salary.findMany({
    where: {
      job_title: jobTitle,
      company: company,
    },
    take: 1,
  });
  return techSalaryList;
};
