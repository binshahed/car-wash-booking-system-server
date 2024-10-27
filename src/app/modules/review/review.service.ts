/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { ReviewModel } from './review.model';
import { TReview } from './review.interface';

import { ObjectId } from 'mongoose';
import { ServiceModel } from '../service/service.model';

const createReview = async (payLoad: TReview, user: any) => {
  payLoad.customer = user._id as ObjectId;
  const review = await ReviewModel.create(payLoad);

  const service = ServiceModel.findById(payLoad.service);

  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service not found!');
  }

  if (!review) {
    throw new AppError(httpStatus.BAD_REQUEST, 'review is not created');
  }
  return review;
};

const getAllReviews = async () => {
  const review = ReviewModel.find().populate('customer').populate('service');
  if (!review) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No reviews found');
  }

  return review;
};

const getServiceReview = async (payload: any) => {
  const review = ReviewModel.find({ service: payload }).populate('customer');

  return review;
};

export const reviewService = {
  createReview,
  getAllReviews,
  getServiceReview,
};
