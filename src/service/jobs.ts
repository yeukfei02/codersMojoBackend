import { PrismaClient, jobs } from '@prisma/client';

const prisma = new PrismaClient();

export const createJobs = async (
  type: string,
  department: string,
  location: string,
  title: string,
  description: string,
): Promise<void> => {
  await prisma.jobs.create({
    data: {
      type: type,
      department: department,
      location: location,
      title: title,
      description: description,
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
