import { PrismaClient, firebase_details } from '@prisma/client';

const prisma = new PrismaClient();

export const addTokenToFirebaseDetails = async (
  currentToken: string,
  refreshedToken: string,
  users_id: number,
): Promise<void> => {
  await prisma.firebase_details.create({
    data: {
      current_token: currentToken,
      refreshed_token: refreshedToken,
      users: {
        connect: {
          users_id: users_id,
        },
      },
    },
  });
};

export const getFirebaseDetailsByCurrentToken = async (currentToken: string): Promise<firebase_details[]> => {
  const fireBaseDetails = await prisma.firebase_details.findMany({
    where: {
      current_token: currentToken,
    },
    take: 1,
  });
  return fireBaseDetails;
};
