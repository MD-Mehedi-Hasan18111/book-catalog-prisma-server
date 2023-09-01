import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

export const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await AuthService.signUpUser(userData);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...newUserWithoutPassword } = user;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: newUserWithoutPassword,
  });
});

export const signInUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const userToken = await AuthService.SignInUser(userData);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signin successfully!',
    token: userToken,
  });
});

export const AuthController = {
  signUpUser,
  signInUser,
};
