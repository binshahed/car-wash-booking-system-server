import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { slotService } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await slotService.createSlot(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot created successfully',
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req, res) => {
  const queryParams = req.query;

  const result = await slotService.getAvailableSlots(queryParams);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});

const getSlotById = catchAsync(async (req, res) => {
  const result = await slotService.getSlotById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot retrieved successfully',
    data: result,
  });
});

const updateSlotStatus = catchAsync(async (req, res) => {
  const result = await slotService.updateSlotStatus(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot updated successfully',
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAvailableSlots,
  getSlotById,
  updateSlotStatus,
};
