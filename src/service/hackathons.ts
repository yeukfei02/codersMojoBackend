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
      image:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
      name: name,
      mode: mode,
      prize: prize,
      details: details,
      date_time: dateTime,
      link: link,
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
