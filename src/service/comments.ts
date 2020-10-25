import { PrismaClient, comments } from '@prisma/client';

const prisma = new PrismaClient();

export const createComments = async (commentsText: string, posts_id: number, users_id: number): Promise<void> => {
  await prisma.comments.create({
    data: {
      comments_text: commentsText,
      posts_id: posts_id,
      users: {
        connect: {
          users_id: users_id,
        },
      },
    },
  });
};

export const getCommentsByPostsId = async (posts_id: number): Promise<comments[]> => {
  const commentsList = await prisma.comments.findMany({
    where: {
      posts_id: posts_id,
    },
  });
  return commentsList;
};
