/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { ReviewModel } from './review.model';
import { TReview } from './review.interface';

import { ObjectId } from 'mongoose';
import { ServiceModel } from '../service/service.model';

const createReview = async (payLoad: TReview, user: any) => {
  payLoad.customer = user._id as ObjectId;
  // Find the service by its ID
  const service = await ServiceModel.findById(payLoad.service);
  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service not found!');
  }

  // Update review totals and calculate the new average rating
  const totalServiceReviews = service.review.total + 1;
  const serviceReview =
    service.review.rating * service.review.total + payLoad.rating;
  const averageServiceRating = serviceReview / totalServiceReviews;

  // Update the service with new review count and rating
  await ServiceModel.findByIdAndUpdate(service._id, {
    review: { total: totalServiceReviews, rating: averageServiceRating },
  });

  // Create the review
  const review = await ReviewModel.create(payLoad);
  if (!review) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Review creation failed');
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
