import { Request, Response } from "express";
import responseHelper from "../utils/responseHelper";
import { StatusCodes } from "http-status-codes";
import userEducation from "../services/userEducation";

const createEducation = async (req: Request, res: Response) => {
  try {
    const education = await userEducation.create(req.body);
    if (education) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Education added Successfully",
        education
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getEducation = async (req: Request, res: Response) => {
  try {
    const education = await userEducation.get(req.params.id);
    if (education) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "education fetched Successfully",
        education
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const updateEducation = async (req: Request, res: Response) => {
  try {
    const education = await userEducation.update(req.body, req.params.id);
    if (education) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Comment added Successfully",
        education
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const deleteEducation = async (req: Request, res: Response) => {
  try {
    const education = await userEducation.deleteEd({is_delete:true}, req.params.id);
    if (education) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "education added Successfully",
        education
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
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation,
};
