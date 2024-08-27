import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: [true, 'Customer is required.'],
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required.'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Rating is required.'],
    },
    message: {
      type: String,
      required: [true, 'Message is required.'],
    },
  },
  {
    timestamps: true,
  },
);

export const ReviewModel = model<TReview>('Review', reviewSchema);
