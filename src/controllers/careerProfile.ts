import { Request, Response } from "express";
import responseHelper from "../utils/responseHelper";
import { StatusCodes } from "http-status-codes";
import profile from "../services/careerProfile";

const createCareerProfile = async (req: Request, res: Response) => {
  try {
    const careerProfile = await profile.create(req.body);
    if (careerProfile) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Career profile details added successfully",
        careerProfile
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getCareerProfile = async (req: Request, res: Response) => {
  try {
    const careerProfile = await profile.get(req.params.id);
    if (careerProfile) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Career profile details fetched successfully",
        careerProfile
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const updateCareerProfile = async (req: Request, res: Response) => {
  try {
    const careerProfile = await profile.update(req.body, req.params.id);
    if (careerProfile) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Career profile details updated successfully",
        careerProfile
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const deleteCareerProfile = async (req: Request, res: Response) => {
  try {
    const careerProfile = await profile.deleteProfile({is_delete:true}, req.params.id);
    if (careerProfile) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Career profile details removed successfully",
        careerProfile
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
  createCareerProfile,
  getCareerProfile,
  updateCareerProfile,
  deleteCareerProfile,
};
