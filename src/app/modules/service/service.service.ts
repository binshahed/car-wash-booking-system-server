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

  return serviceResult;
};
const getAllServicesAdmin = async (query: Record<string, unknown>) => {
  // Create the base query using the QueryBuilder
  const services = new QueryBuilder(ServiceModel.find(), query)
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

  // Execute the query to get the results
  const serviceResult = await services.modelQuery.exec();

  // Fetch the total count of documents without pagination filters
  const totalCount = await ServiceModel.countDocuments(services.filterQuery);

  // Extract pagination parameters from the query
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 10;

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  // Return the result along with pagination details
  return {
    data: serviceResult,
    total: totalCount,
    currentPage: page,
    totalPages,
    pageSize: limit,
  };
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
  getAllServicesAdmin,
};
