import { ObjectId } from 'mongoose';

export type TReview = {
  customer: ObjectId;
  service: ObjectId;
  designation: string;
  rating: number;
  message: string;
};
