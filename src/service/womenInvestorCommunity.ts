import { PrismaClient, women_investor_community } from '@prisma/client';

const prisma = new PrismaClient();

export const createWomenInvestorCommunity = async (
  image: string,
  name: string,
  investorType: string,
  areaOfInvestment: string,
  expertise: string,
  location: string,
  connectStatus: string,
): Promise<void> => {
  await prisma.women_investor_community.create({
    data: {
      image: image ? image : '',
      name: name ? name : '',
      investor_type: investorType ? investorType : '',
      areas_of_investment: areaOfInvestment ? areaOfInvestment : '',
      expertise: expertise ? expertise : '',
      location: location ? location : '',
      status: connectStatus ? connectStatus : '',
    },
  });
};

export const getWomenInvestorCommunity = async (): Promise<women_investor_community[]> => {
  const womenInvestorCommunityList = await prisma.women_investor_community.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return womenInvestorCommunityList;
};

export const getWomenInvestorCommunityByFilter = async (
  expertise: string,
  location: string,
): Promise<women_investor_community[]> => {
  const womenInvestorCommunityList = await prisma.women_investor_community.findMany({
    where: {
      expertise: expertise,
      location: location,
    },
    orderBy: {
      name: 'asc',
    },
  });
  return womenInvestorCommunityList;
};
