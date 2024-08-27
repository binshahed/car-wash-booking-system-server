import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TService } from './service.interface';
import { ServiceModel } from './service.model';
import NotFoundError from '../../errors/NotFoundError';
import { QueryBuilder } from '../../builder/QueryBuilder';

const createService = async (payLoad: TService) => {
  const service = await ServiceModel.create(payLoad);
  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service is not created');
  }
  return service;
};

const getAllServices = async (query: Record<string, unknown>) => {
  const services = new QueryBuilder(
    ServiceModel.find({ isDeleted: { $ne: true } }),
    query,
  )
    .search(['name', 'description'])
    .filter([
      'searchTerm',
      'sort',
      'order',
      'limit',
      'page',
      'fields',
      'priceRange',
    ])
    .sort()
    .paginate()
    .fields();
  const serviceResult = await services.modelQuery.exec();

  // if (serviceResult?.length === 0) {
  //   throw new NotFoundError(
  //     httpStatus.NOT_FOUND,
  //     'Services not found!',
  //     serviceResult,
  //   );
  // }

  return serviceResult;
};

const getServiceById = async (id: string) => {
  const service = await ServiceModel.findById(id);

  // checking is service is deleted
  if (service?.isDeleted) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Service is deleted!');
  }

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

const updateServiceById = async (id: string, payLoad: Partial<TService>) => {
  const service = await ServiceModel.findByIdAndUpdate(id, payLoad, {
    new: true,
  });

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

const deleteServiceById = async (id: string) => {
  const service = await ServiceModel.findById(id);

  // checking is service is available
  if (service?.isDeleted || !service) {
    throw new NotFoundError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const result = await ServiceModel.findByIdAndUpdate(id, { isDeleted: true });

  return result;
};

export const serviceService = {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
