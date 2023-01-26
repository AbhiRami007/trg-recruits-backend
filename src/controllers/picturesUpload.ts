import { StatusCodes } from "http-status-codes";
import responseHelper from "../utils/responseHelper";
import multer from "multer";
import multers3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";
import user from "../services/user";

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
    key: async (req, file, cb) => {
      const userData = await user.getById(req.params.id);
      if (userData) {
        cb(null, file.originalname);
      } else {
        return cb("Error: No user Found");
      }
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

const uploadImage = async (req: any, res: any) => {
  try {
    const documentsData: any = await user.getById(req.params.id);
    if (documentsData) {
      await user.update({ avatar: req.file.location }, req.params.id);
    }
    const userInfo = await user.getById(req.params.id);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Picture Updated",
      userInfo
    );
  } catch (error) {
    return responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error);
  }
};

const getImage = async (req: any, res: any) => {
  try {
    const document = await user.getById(req.params.id);
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

const deleteFile = async (req: any, res: any) => {
  try {
    let userData: any = await user.getById(req.params.id);
    if (userData && userData.avatar) {
      const file =
        userData && userData.avatar && userData.avatar.split("/").pop();
      await s3.deleteObject({ Bucket: bucket, Key: file }).promise();
      await user.update({ avatar: "" }, req.params.id);
    }
    userData = await user.getById(req.params.id);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Profile Picture Removed",
      userData
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
  uploadImage,
  getImage,
  deleteFile,
  // listDocuments
};
