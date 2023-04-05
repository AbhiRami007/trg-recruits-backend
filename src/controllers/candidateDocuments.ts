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
      return cb("Error: File type not supported!");
    }
  },
});

const uploadDocument = async (req: any, res: any) => {
  try {
    const documentsData: any = await candidateDocuments.getById(req.params.id);
    let key = req.params.type;
    let others;

    let obj = {};
    obj[key] = req.file.location;
    if (req.params.type == "experience") {
      const data = documentsData.other_documents.experience;
      obj[key] = [];
      obj[key].push(...data, req.file.location);
    }
    if (documentsData) {
      if (
        req.params.type !== "resume" &&
        req.params.type !== "cover" &&
        req.params.type !== "video_resume"
      ) {
        others = documentsData.other_documents;

        obj = { other_documents: { ...others, ...obj } };
      }
      await candidateDocuments.update(req.params.id, obj);
    } else {
      if (
        req.params.type !== "resume" &&
        req.params.type !== "cover" &&
        req.params.type !== "video_resume"
      ) {
        others = obj;
      }
      const reqBody = {
        userId: req.params.id,
        resume: req.params.type == "resume" ? req.file.location : null,
        cover_letter: req.params.type == "cover" ? req.file.location : null,
        video_resume:
          req.params.type == "video_resume" ? req.file.location : null,
        other_documents: others,
      };
      await candidateDocuments.create(reqBody);
    }
    const document = await candidateDocuments.getById(req.params.id);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      `${req.params.type} updated`,
      document
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
    let documents = await candidateDocuments.getById(req.params.id);
    let obj = {};
    let key = req.params.type;
    obj[key] = "";
    const file =
      documents &&
      (
        documents[req.params.type] ||
        documents?.other_documents[req.params.type]
      )
        .split("/")
        .pop();

    if (documents) {
      let others;
      if (
        req.params.type !== "resume" &&
        req.params.type !== "cover" &&
        req.params.type !== "video_resume"
      ) {
        others = documents.other_documents;
        obj = { other_documents: { ...others, ...obj } };
      }
      await candidateDocuments.update(req.params.id, obj);
      await s3
        .deleteObject({
          Bucket: bucket,
          Key: req.params.type + "/" + file,
        })
        .promise();
    }
    documents = await candidateDocuments.getById(req.params.id);
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
