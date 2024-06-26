import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TService } from './service.interface';
import { ServiceModel } from './service.model';
import NotFoundError from '../../errors/NotFoundError';

const createService = async (payLoad: TService) => {
  const service = await ServiceModel.create(payLoad);
  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service is not created');
  }
  return service;
};

const getAllServices = async () => {
  const services = await ServiceModel.find();
  // checking is service is available
  if (services.length === 0) {
    throw new NotFoundError(
      httpStatus.NOT_FOUND,
      'Services not found!',
      services,
    );
  }
  return services;
};

const getServiceById = async (id: string) => {
  const service = await ServiceModel.findById(id);

  // checking is service is available
  if (!service) {
    throw new NotFoundError(
      httpStatus.NOT_FOUND,
      'Service not found!',
      service,
    );
  }
  return service;
};

export const serviceService = {
  createService,
  getAllServices,
  getServiceById,
};
