import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { userService } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const result = await userService.updateUserStatus(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User role updated successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: req.user,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await userService.updateProfile(req.user?._id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile updated successfully',
    data: result,
  });
});

export const userController = {
  getAllUsers,
  updateUserStatus,
  getMe,
  updateProfile,
};
