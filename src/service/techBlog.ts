import { PrismaClient, tech_blog } from '@prisma/client';

const prisma = new PrismaClient();

export const createTechBlog = async (
  image: string,
  title: string,
  description: string,
  tag: string,
  users_id: number,
): Promise<void> => {
  await prisma.tech_blog.create({
    data: {
      image: image,
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

export const getTechBlog = async (): Promise<tech_blog[]> => {
  const techBlogList = await prisma.tech_blog.findMany();
  return techBlogList;
};

export const getTechBlogByTag = async (tag: string): Promise<tech_blog[]> => {
  const techBlogList = await prisma.tech_blog.findMany({
    where: {
      tag: tag,
    },
  });
  return techBlogList;
};
