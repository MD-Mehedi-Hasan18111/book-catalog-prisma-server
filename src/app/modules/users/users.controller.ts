import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './users.service';

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

export const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await UserService.getSingleUser(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: user,
  });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data = req.body;
  const user = await UserService.updateUser(userId, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

export const UsersController = {
  getAllUsers,
  getSingleUser,
  updateUser,
};
