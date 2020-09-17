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
