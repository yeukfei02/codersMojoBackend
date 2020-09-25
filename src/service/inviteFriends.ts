import { PrismaClient, invite_friends } from '@prisma/client';

const prisma = new PrismaClient();

export const createInviteFriends = async (inviteLink: string, users_id: number): Promise<void> => {
  await prisma.invite_friends.create({
    data: {
      invite_link: inviteLink,
      users: {
        connect: {
          users_id: users_id,
        },
      },
    },
  });
};

export const getInviteFriendsByUsersId = async (users_id: number): Promise<invite_friends[]> => {
  const inviteFriends = await prisma.invite_friends.findMany({
    where: {
      users_id: users_id,
    },
    take: 1,
  });
  return inviteFriends;
};
