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

const getMyReviews = async (payload: any) => {
  const review = ReviewModel.find({ customer: payload })
    .populate('customer')
    .populate('service');

  return review;
};

const deleteReview = async (payload: any) => {
  const review = await ReviewModel.findById(payload);
  const service = await ServiceModel.findById(review?.service);

  if (!review || !service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Review or service not found');
  }

  // Calculate the new total reviews
  const totalServiceReviews = service.review.total - 1;

  // Ensure total reviews cannot go below zero
  const newTotalServiceReviews = Math.max(totalServiceReviews, 0);

  // Calculate the new average rating
  const serviceReview =
    service.review.rating * service.review.total - review.rating;

  const averageServiceRating =
    newTotalServiceReviews > 0 ? serviceReview / newTotalServiceReviews : 0; // Set average rating to 0 if there are no reviews

  // Update the service with the new totals and average rating
  await ServiceModel.findByIdAndUpdate(review?.service, {
    review: { total: newTotalServiceReviews, rating: averageServiceRating },
  });

  // Delete the review
  const deletedReview = await ReviewModel.findByIdAndDelete(payload);
  if (!deletedReview) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Review not found');
  }

  return deletedReview;
};

const updateReview = async (id: any, payload: any) => {
  // Find the existing review and service
  const review = await ReviewModel.findById(id);
  const service = await ServiceModel.findById(review?.service);

  if (!review || !service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Review or service not found');
  }

  // Validate the updated rating
  const updatedRating = payload.rating;

  if (
    typeof updatedRating !== 'number' ||
    updatedRating < 0 ||
    updatedRating > 5
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Rating must be a number between 0 and 5',
    );
  }

  // Update the service total reviews and average rating
  const totalServiceReviews = service.review.total;
  const previousRating = review.rating; // Store the previous rating

  // Calculate the new average rating
  const serviceReview =
    service.review.rating * totalServiceReviews -
    previousRating +
    updatedRating;

  // Ensure total reviews cannot go below zero
  const newTotalServiceReviews =
    totalServiceReviews <= 0 ? 0 : totalServiceReviews;
  const averageServiceRating =
    newTotalServiceReviews > 0 ? serviceReview / newTotalServiceReviews : 0; // Set average rating to 0 if there are no reviews

  // Update the service with new average rating
  await ServiceModel.findByIdAndUpdate(review.service, {
    review: { total: newTotalServiceReviews, rating: averageServiceRating },
  });

  // Update the review with new data
  const updatedReview = await ReviewModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updatedReview) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Review not found');
  }

  return updatedReview;
};


export const reviewService = {
  createReview,
  getAllReviews,
  getServiceReview,
  getMyReviews,
  deleteReview,
  updateReview,
};
