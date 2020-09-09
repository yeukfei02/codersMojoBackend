import { PrismaClient, users } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (email: string, password: string): Promise<void> => {
  await prisma.users.create({
    data: {
      email: email,
      password: password,
    },
  });
};

export const getUserByEmail = async (email: string): Promise<users> => {
  const user = await prisma.users.findMany({
    where: {
      email: email,
    },
    take: 1,
  });
  return user[0];
};

export const getAllUser = async (): Promise<users[]> => {
  const userList = await prisma.users.findMany();
  return userList;
};

export const getUserById = async (id: number): Promise<users> => {
  const user = await prisma.users.findOne({
    where: {
      users_id: id,
    },
  });
  return user;
};
