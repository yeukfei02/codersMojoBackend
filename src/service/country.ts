import { PrismaClient, country } from '@prisma/client';

const prisma = new PrismaClient();

export const getCountry = async (): Promise<country[]> => {
  const countryList = await prisma.country.findMany({});
  return countryList;
};
