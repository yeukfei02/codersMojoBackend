import { PrismaClient, tech_blog } from '@prisma/client';

const prisma = new PrismaClient();

export const createTechBlog = async (
  title: string,
  description: string,
  tag: string,
  users_id: number,
): Promise<void> => {
  await prisma.tech_blog.create({
    data: {
      image:
        'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
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

export const getTechBlogByUsersId = async (users_id: number): Promise<tech_blog[]> => {
  const techBlogList = await prisma.tech_blog.findMany({
    where: {
      users_id: users_id,
    },
  });
  return techBlogList;
};

export const getTechBlogByUsersIdAndTag = async (users_id: number, tag: string): Promise<tech_blog[]> => {
  const techBlogList = await prisma.tech_blog.findMany({
    where: {
      users_id: users_id,
      tag: tag,
    },
  });
  return techBlogList;
};
