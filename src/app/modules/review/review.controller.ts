import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { reviewService } from './review.service';

// create a new Review
const createReview = catchAsync(async (req, res) => {
  const result = await reviewService.createReview(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review created successfully',
    data: result,
  });
});

// get all Review
const getAllReview = catchAsync(async (req, res) => {
  const result = await reviewService.getAllReviews();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

const getServiceReview = catchAsync(async (req, res) => {
  const result = await reviewService.getServiceReview(req.params.serviceId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

const getMyReviews = catchAsync(async (req, res) => {
  const result = await reviewService.getMyReviews(req.user?._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const result = await reviewService.deleteReview(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review deleted successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  console.log(req.body);

  const result = await reviewService.updateReview(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review updated successfully',
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReview,
  getServiceReview,
  getMyReviews,
  deleteReview,
  updateReview,
};
