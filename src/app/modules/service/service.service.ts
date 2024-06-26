import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TService } from './service.interface';
import { ServiceModel } from './service.model';

const createService = async (payLoad: TService) => {
  const service = await ServiceModel.create(payLoad);
  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service is not created');
  }
  return service;
};

const getAllServices = async () => {
  const services = await ServiceModel.find();
  if (services.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service is not found');
  }
  return services;
};

export const serviceService = {
  createService,
  getAllServices,
};
