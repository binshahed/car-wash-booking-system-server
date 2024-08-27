import { ObjectId } from 'mongoose';

export type TReview = {
  customer: ObjectId;
  designation: string;
  rating: number;
  message: string;
};
