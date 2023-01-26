import { Request, Response } from "express";
import responseHelper from "../utils/responseHelper";
import { StatusCodes } from "http-status-codes";
import trackStatus from "../services/trackStatus";

const addStatus = async (req: Request, res: Response) => {
  try {
    const track = await trackStatus.create(req.body);
    if (track) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Status added Successfully",
        track
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const updateStatus = async (req: Request, res: Response) => {
  try {
    const track = await trackStatus.get(req.params.id);
    if (track) {
      await trackStatus.update(track.id, req.body);
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Status updated Successfully",
        track
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getStatus = async (req: Request, res: Response) => {
  try {
    const track = await trackStatus.get(req.params);
    if (track) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Status fetched Successfully",
        track
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

export default {
  addStatus,
  getStatus,
updateStatus
};
