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
  const result = await serviceService.getAllServices();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    data: result,
  });
});

export const serviceController = {
  createService,
  getAllServices,
};
