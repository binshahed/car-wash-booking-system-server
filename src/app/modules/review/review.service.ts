/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { ReviewModel } from './review.model';
import { TReview } from './review.interface';

import { ObjectId } from 'mongoose';

const createReview = async (payLoad: TReview, user: any) => {
  payLoad.customer = user._id as ObjectId;
  const review = await ReviewModel.create(payLoad);
  if (!review) {
    throw new AppError(httpStatus.BAD_REQUEST, 'review is not created');
  }
  return review;
};

const getAllReviews = async () => {
  const review = ReviewModel.find().populate('customer');
  if (!review) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No reviews found');
  }

  return review;
};

export const reviewService = {
  createReview,
  getAllReviews,
};
