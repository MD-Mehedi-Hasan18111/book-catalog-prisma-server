import { PrismaClient, User } from '.prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return users;
};

const getSingleUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return user;
};

const updateUser = async (
  userId: string,
  userUpdateData: Partial<User>
): Promise<User> => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: userUpdateData,
  });

  return user;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
};
