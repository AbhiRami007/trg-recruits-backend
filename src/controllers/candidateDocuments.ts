import { StatusCodes } from 'http-status-codes';
import responseHelper from '../utils/responseHelper';
import multer from 'multer'
import multers3 from 'multer-s3'
import AWS from 'aws-sdk'
import path from 'path';
import user from '../services/user';

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
        key: async (req,file, cb) => {
                const userData=await user.get(req.params)
                if (userData) {
                cb(null, req.params.email+'/'+req.params.type+'/'+file.originalname)  
                } else {
                    return cb("Error: No user Found");    
                }
        }
    }),
     limits: { fileSize: 1024 * 1024 * 50 }, // 50MB
    // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
    fileFilter: function (_req, file, cb) {
        const filetypes = /pdf|doc|txt/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(`Error: File type should be pdf or doc!`);
        }
    }
})


const uploadDocument=(req:any,res:any) => {
    try {
        return responseHelper.successResponse(res, StatusCodes.OK)('Document Added',{imagePath:req.file.key});
    } catch (error) {
     return responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
}

const getDocument = async (req:any,res:any) => {
    try {
        const file=req.params.file
        let data: any = await s3.getObject({Bucket:bucket, Key:req.params.email+'/'+req.params.type+'/'+file}).promise()
        return responseHelper.successResponse(res, StatusCodes.OK)('Document fetched',data.Body);
    } catch (error) {
     return responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
}

const deleteDocument = async (req:any,res:any) => {
    try {
        const file=req.params.image
        await s3.deleteObject({Bucket:bucket, Key:req.params.email+'/'+req.params.type+'/'+file}).promise()
        return responseHelper.successResponse(res, StatusCodes.OK)('Document Removed');
    } catch (error) {
     return responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
}

const listDocuments=async (_req:any,res:any) => {
    try {
        const result:any=await s3.listObjectsV2({Bucket:bucket}).promise()
        const data=result.Contents.map(items=>items.Key)
        return responseHelper.successResponse(res, StatusCodes.OK)('Documents fetched', data);
    } catch (error) {
     return responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
}

export default{
    uploadFile,
    uploadDocument,
    getDocument,
    deleteDocument,
    listDocuments
}