import {Response } from "express";
import jobs from "../services/jobs";
import { StatusCodes } from "http-status-codes";
import responseHelper from "../utils/responseHelper";
import multer from "multer";
import multers3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";
import careerProfile from "../services/careerProfile";
import featuredCompanies from "../services/featuredCompanies";

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
      return cb(`Error: File type should be jpeg, jpg or png!`);
    }
  },
});

const createFeaturedCompany = async (req: any, res: Response) => {
  try {
    const logo = req.files[0]?.location;
    req.body.logo = logo;
    req.body.created_on = new Date();
    req.body.sector = req.body.sector;
    const client = await featuredCompanies.createClient(req.body);
    if (client) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Client created Successfully",
        client
      );
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
};

const getFeaturedCompany = async (req, res) => {
  try {
    const user = await careerProfile.get(req.param.id);
    const allCompanies = await featuredCompanies.getAllClients();
    const client = await featuredCompanies.getClient(user?.current_industry);
    if (client || allCompanies) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Featured Companies fetched",
        client ?? allCompanies
      );
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
};
export default {
  createFeaturedCompany,
  getFeaturedCompany,
  uploadFile,
};
