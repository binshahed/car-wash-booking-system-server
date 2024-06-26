import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, unique: true, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    duration: { type: Number, required: [true, 'Duration is required'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const ServiceModel = model<TService>('Service', serviceSchema);
