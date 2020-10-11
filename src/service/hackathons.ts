import { PrismaClient, hackathons } from '@prisma/client';

const prisma = new PrismaClient();

export const createHackathons = async (
  name: string,
  mode: string,
  prize: string,
  details: string,
  dateTime: string,
  link: string,
): Promise<void> => {
  await prisma.hackathons.create({
    data: {
      image: '',
      name: name ? name : '',
      mode: mode ? mode : '',
      prize: prize ? prize : '',
      details: details ? details : '',
      date_time: dateTime ? dateTime : '',
      link: link ? link : '',
    },
  });
};

export const getHackathons = async (): Promise<hackathons[]> => {
  const hackathonsList = await prisma.hackathons.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return hackathonsList;
};

export const getHackathonsByFilter = async (name: string): Promise<hackathons[]> => {
  const hackathonsList = await prisma.hackathons.findMany({
    where: {
      name: name,
    },
    orderBy: {
      name: 'asc',
    },
  });
  return hackathonsList;
};

export const getHackathonsByName = async (name: string): Promise<hackathons[]> => {
  const hackathons = await prisma.hackathons.findMany({
    where: {
      name: name,
    },
    take: 1,
  });
  return hackathons;
};
