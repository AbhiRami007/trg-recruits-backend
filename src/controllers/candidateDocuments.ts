import { StatusCodes } from "http-status-codes";
import responseHelper from "../utils/responseHelper";
import multer from "multer";
import multers3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";
import user from "../services/user";
import { CONFIG } from "../config/env";
import candidateDocuments from "../services/candidateDocuments";

AWS.config.update({
  region: CONFIG.AWS_ACCOUNT_REGION,
  accessKeyId: CONFIG.AWS_ACCESS_KEY,
  secretAccessKey: CONFIG.AWS_SECRET_ACCESS_KEY,
});

const bucket: any = CONFIG.AWS_S3_BUCKET;
const s3 = new AWS.S3();

const uploadFile = multer({
  storage: multers3({
    bucket,
    s3,
    key: async (req, file, cb) => {
      const userData = await user.getById(req.params.id);
      if (userData) {
        cb(null, req.params.type + "/" + file.originalname);
      } else {
        return cb("Error: No user Found");
      }
    },
  }),
  limits: { fileSize: 1024 * 1024 * 50 },
  fileFilter: function (req, file, cb) {
    const filetypes = req.params.type == "video_resume" ? /mp4/ : /pdf|doc|txt/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(`Error: File type should be pdf or doc!`);
    }
  },
});

const uploadDocument = async (req: any, res: any) => {
  try {
    const documentsData: any = await candidateDocuments.getById(req.params.id);
    let key = req.params.type;
    let obj = {};
    obj[key] = req.file.location;
    if (documentsData) {
      await candidateDocuments.update(req.params.id, obj);
    } else {
      const reqBody = {
        userId: req.params.id,
        resume: req.params.type == "resume" ? req.file.location : "",
        cover_letter: req.params.type == "cover" ? req.file.location : "",
      };
      await candidateDocuments.create(reqBody);
    }
    return responseHelper.successResponse(res, StatusCodes.OK)(
      `${req.params.type} updated`,
      { imagePath: req.file.location }
    );
  } catch (error) {
    return responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error);
  }
};

const getDocument = async (req: any, res: any) => {
  try {
    const document = await candidateDocuments.getById(req.params.id);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Document fetched",
      document
    );
  } catch (error) {
    return responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error);
  }
};

const getDocsByIds = async (req: any, res: any) => {
  try {
    const ids: any = (req.query.id as string)?.split(",");
    const documents = await candidateDocuments.getByIds(ids);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Documents fetched Successfully",
      documents
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const deleteDocument = async (req: any, res: any) => {
  try {
    const documents = await candidateDocuments.getById(req.params.id);
    const obj = {};
    let key = req.params.type;
    obj[key] = "";
    const file = documents && documents[req.params.type].split("/").pop();
    if (documents) {
      await candidateDocuments.update(req.params.id, obj);
      await s3
        .deleteObject({
          Bucket: bucket,
          Key: req.params.type + "/" + file,
        })
        .promise();
    }

    return responseHelper.successResponse(res, StatusCodes.OK)(
      `Deleted`,
      documents
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const listDocuments = async (_req: any, res: any) => {
  try {
    const result: any = await s3.listObjectsV2({ Bucket: bucket }).promise();
    const data = result.Contents.map((items) => items.Key);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Documents fetched",
      data
    );
  } catch (error) {
    return responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error);
  }
};

export default {
  uploadFile,
  uploadDocument,
  getDocument,
  deleteDocument,
  listDocuments,
  getDocsByIds,
};
