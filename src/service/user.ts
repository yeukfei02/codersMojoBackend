import { PrismaClient, users } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<void> => {
  await prisma.users.create({
    data: {
      first_name: firstName,
      last_name: lastName,
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

export const updateUserPassword = async (id: number, newPasswordHash: string): Promise<users> => {
  const updatedUser = await prisma.users.update({
    data: {
      password: newPasswordHash,
    },
    where: {
      users_id: id,
    },
  });
  return updatedUser;
};
