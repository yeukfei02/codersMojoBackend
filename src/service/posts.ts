import { PrismaClient, posts, users } from '@prisma/client';

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
  const postsList = await prisma.posts.findMany({
    orderBy: {
      posts_id: 'asc',
    },
  });
  return postsList;
};

export const getPostsByTag = async (tag: string): Promise<posts[]> => {
  const postsList = await prisma.posts.findMany({
    where: {
      tag: tag,
    },
    orderBy: {
      posts_id: 'asc',
    },
  });
  return postsList;
};

export const addPostsLikeCount = async (posts_id: number): Promise<void> => {
  const posts = await prisma.posts.findUnique({
    where: {
      posts_id: posts_id,
    },
  });
  const newLikeCount = (posts.like_count += 1);

  await prisma.posts.update({
    data: {
      like_count: newLikeCount,
    },
    where: {
      posts_id: posts_id,
    },
  });
};

export const deletePostsById = async (postId: number): Promise<posts> => {
  const posts = await prisma.posts.delete({
    where: {
      posts_id: postId,
    },
  });
  return posts;
};
