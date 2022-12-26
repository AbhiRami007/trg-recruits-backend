import {Request, Response} from 'express';
import responseHelper from '../utils/responseHelper';
import {StatusCodes} from 'http-status-codes';
import jobs from '../services/jobs';

const createJobs = async (req: Request, res: Response) => {
  try {
    const jobInfo = await jobs.create(req.body);
    if (jobInfo) {
        return responseHelper.successResponse(res, StatusCodes.OK)("Job created Successfully", jobInfo);
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const getJobsByLocationOrTitle = async (req: Request, res: Response) => {
  try {
    const jobInfo = await jobs.get(req.query.search, req.query.location);
    if (jobInfo) {
        return responseHelper.successResponse(res, StatusCodes.OK)("Job fetched Successfully", jobInfo);
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const getJobsByTitle = async (req: Request, res: Response) => {
  try {
    const jobInfo = await jobs.getByTitle(req.query.search);
    if (jobInfo) {
        return responseHelper.successResponse(res, StatusCodes.OK)("Job fetched Successfully", jobInfo);
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const getJobsById = async (req: Request, res: Response) => {
  try {
    const jobInfo = await jobs.getByTitle(req.params.id);
    if (jobInfo) {
        return responseHelper.successResponse(res, StatusCodes.OK)("Job fetched Successfully", jobInfo);
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const listJobs = async (_req: Request, res: Response) => {
    try {   
      const jobsInfo = await jobs.list()
    return responseHelper.successResponse(res, StatusCodes.OK)("Job Details fetched Successfully", jobsInfo);
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const updateJob = async (req: Request, res: Response) => {
    try {   
        const jobsInfo = await jobs.getById(req.params.id)
        if (jobsInfo) {
            const updated = await jobs.update(req.params.id, req.body);
    return responseHelper.successResponse(res, StatusCodes.OK)("Job Details updated Successfully", updated);
            
        }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const removeJob = async (req: Request, res: Response) => {
    try {   
        await jobs.remove(req.params.id)
    return responseHelper.successResponse(res, StatusCodes.OK)("Job Details removed Successfully");
        
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};



export default {
    createJobs,
    listJobs,
    getJobsByTitle,
    getJobsByLocationOrTitle,
    getJobsById,
    updateJob,
    removeJob
};
