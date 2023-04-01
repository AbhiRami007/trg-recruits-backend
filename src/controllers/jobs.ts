import { Request, Response } from "express";
import jobs from "../services/jobs";
import { StatusCodes } from "http-status-codes";
import responseHelper from "../utils/responseHelper";
import multer from "multer";
import multers3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";
import careerProfile from "../services/careerProfile";
import user from "../services/user";
import userSocketNotification from "../services/userSocketNotification";

AWS.config.update({
  region: process.env.AWS_ACCOUNT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const bucket: any = process.env.AWS_S3_BUCKET;
const s3 = new AWS.S3();

const uploadFile = multer({
  storage: multers3({
    bucket,
    s3,
    // acl: "public-read",
    key: async (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 50 }, // 50MB
  // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
  fileFilter: function (_req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(`Error: File type should be jpeg, jpg or png!`);
    }
  },
});

function processArray(body) {
  if (body.includes(",")) {
    body = body.split(",");
  } else {
    body = body.split();
  }
  return body;
}
const createJobs = async (req: any, res: Response) => {
  try {
    const image = req.files[0]?.location;
    const logo = req.files[1]?.location;
    req.body.description_image = image;
    req.body.logo = logo;
    req.body.requirements = processArray(req.body.requirements);
    req.body.job_description = processArray(req.body.job_description);
    req.body.job_responsibilities = processArray(req.body.job_responsibilities);
    req.body.qualifications = processArray(req.body.qualifications);
    req.body.preference = processArray(req.body.preference);
    req.body.working_at = processArray(req.body.working_at);
    req.body.about_company = processArray(req.body.about_company);
    req.body.created_on = new Date();
    req.body.job_keywords = processArray(req.body.job_keywords);
    const jobInfo = await jobs.create(req.body);
    if (jobInfo) {
      let userData: any = await careerProfile.getByKey(req.body.job_keywords);
      if (!userData.length) {
        userData = await user.list();
      }
      const notifyUserIds = userData.map((x) => x.userId ?? x.id);
      userSocketNotification.sendJobPostNotification(notifyUserIds, jobInfo);
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Job created Successfully",
        jobInfo
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getJobsByLocationOrTitle = async (req: Request, res: Response) => {
  try {
    let jobInfo;
    if (req.query.title && !req.query.location) {
      jobInfo = await jobs.getByTitle(req.query.title);
    } else if (!req.query.title && req.query.location) {
      jobInfo = await jobs.getByLocation(req.query.location);
    } else {
      jobInfo = await jobs.get(req.query.title, req.query.location);
    }

    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Job fetched Successfully",
      jobInfo
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getJobsById = async (req: Request, res: Response) => {
  try {
    const jobInfo = await jobs.getByTitle(req.params.id);
    if (jobInfo) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Job fetched Successfully",
        jobInfo
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const listJobs = async (_req: Request, res: Response) => {
  try {
    const jobsInfo = await jobs.list();
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Job Details fetched Successfully",
      jobsInfo
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const listRecommendedJobs = async (req: Request, res: Response) => {
  try {
    const careerData = await careerProfile.get(Number(req.params.id));
    const jobsInfo = await jobs.listRecommended(careerData?.dataValues);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Job Details fetched Successfully",
      jobsInfo
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const updateJob = async (req: Request, res: Response) => {
  try {
    const jobsInfo = await jobs.getById(req.params.id);
    if (jobsInfo) {
      const updated = await jobs.update(req.params.id, req.body);
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Job Details updated Successfully",
        updated
      );
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const removeJob = async (req: Request, res: Response) => {
  try {
    await jobs.remove(req.params.id);
    return responseHelper.successResponse(
      res,
      StatusCodes.OK
    )("Job Details removed Successfully");
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getSavedJobs = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.getById(req.params.id);
    const jobsData = await jobs.listJobsById(userInfo?.saved_jobs);
    if (jobsData) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Saved Jobs List",
        jobsData
      );
    } else {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("No Jobs Saved");
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getAppliedJobs = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.getById(req.params.id);
    const jobsData = await jobs.listJobsById(userInfo?.applied_jobs);
    if (jobsData) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Applied Jobs List",
        jobsData
      );
    } else {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("No Jobs Applied");
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const updateAppliedJobs = async (req: Request, res: Response) => {
  try {
    const jobsInfo = await jobs.getById(req.params.id);
    const userInfo = await user.getById(req.body.userId);
    if (
      jobsInfo &&
      !jobsInfo.dataValues.applied_candidates.includes(req.body.userId) &&
      userInfo &&
      !userInfo.dataValues.applied_jobs.includes(req.params.id)
    ) {
      const jobApplied = {
        applied_candidates: [
          ...jobsInfo.dataValues.applied_candidates,
          req.body.userId,
        ],
      };
      await jobs.update(req.params.id, jobApplied);

      const userApplied = {
        applied_jobs: [...userInfo.dataValues.applied_jobs, req.params.id],
      };
      await user.update(userApplied, req.body.userId);

      return responseHelper.successResponse(
        res,
        StatusCodes.OK
      )("Applied Successfully");
    } else {
      responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("Already applied");
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const updateSavedJobs = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.getById(req.body.userId);
    if (userInfo && !userInfo.dataValues.saved_jobs.includes(req.params.id)) {
      const userSaved = {
        saved_jobs: [...userInfo.dataValues.saved_jobs, req.params.id],
      };
      await user.update(userSaved, req.body.userId);

      return responseHelper.successResponse(
        res,
        StatusCodes.OK
      )("Saved Successfully");
    } else {
      responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("Already saved");
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

export default {
  createJobs,
  listJobs,
  getJobsByLocationOrTitle,
  getJobsById,
  updateJob,
  removeJob,
  getAppliedJobs,
  getSavedJobs,
  uploadFile,
  updateAppliedJobs,
  updateSavedJobs,
  listRecommendedJobs,
};
