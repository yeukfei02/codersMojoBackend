import { PrismaClient, posts } from '@prisma/client';

const prisma = new PrismaClient();

export const createPosts = async (title: string, description: string, tag: string, users_id: number): Promise<void> => {
  await prisma.posts.create({
    data: {
      title: title,
      description: description,
      tag: tag,
      users: {
        connect: {
          users_id: users_id,
        },
      },
    },
  });
};

export const getPosts = async (): Promise<posts[]> => {
  const postsList = await prisma.posts.findMany();
  return postsList;
};

export const getPostsByTag = async (tag: string): Promise<posts[]> => {
  const postsList = await prisma.posts.findMany({
    where: {
      tag: tag,
    },
  });
  return postsList;
};
