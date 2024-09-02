import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { serviceService } from './service.service';

// create a new service
const createService = catchAsync(async (req, res) => {
  const result = await serviceService.createService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});

// get all services
const getAllServices = catchAsync(async (req, res) => {
  const result = await serviceService.getAllServices(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    data: result,
  });
});
// get all services
const getAllServicesAdmin = catchAsync(async (req, res) => {
  const result = await serviceService.getAllServicesAdmin(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    data: result,
  });
});
const getServiceById = catchAsync(async (req, res) => {
  const result = await serviceService.getServiceById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateServiceById = catchAsync(async (req, res) => {
  const result = await serviceService.updateServiceById(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteServiceById = catchAsync(async (req, res) => {
  const result = await serviceService.deleteServiceById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const serviceController = {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
  getAllServicesAdmin,
};
