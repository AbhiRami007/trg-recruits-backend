import multer from 'multer'
import multers3 from 'multer-s3'
import AWS from 'aws-sdk'
import path from 'path';
import user from '../services/user';
import { StatusCodes } from 'http-status-codes';
import responseHelper from '../utils/responseHelper';
// import { StatusCodes } from 'http-status-codes';
// import responseHelper from '../utils/responseHelper';
// import path from 'path';
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_ACCOUNT_REGION,
});

const bucket = process.env.AWS_S3_BUCKET;
const s3 = new AWS.S3();

const uploadFile = multer({
    storage: multers3({
        bucket,
        s3,
        // acl: "public-read",
        key: async (req,file, cb) => {
            const userData=await user.get(req.query)
            if (userData) {
            cb(null, req.query.email+'/'+file.originalname)  
            } else {
                cb("Error: No user Found");
                 
            }
        }
    }),
     limits: { fileSize: 1024 * 1024 * 50 }, // 50MB
    // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
    fileFilter: function (_req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: File type should be jpeg|jpg|png|pdf !");
        }
    }
})


const uploadDocuments=(req:any,res:any) => {
    try {
        responseHelper.successResponse(res, StatusCodes.OK)('Document Uploaded Successfully',req.files);
    } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
}


// const listDocuments = async (req: any, res: any) => {
//     let responseData = await s3.listObjectsV2({ Bucket: bucket }).promise();
//     let x = responseData?.Contents?.map((file) => {
//         file.Key
//     })
//     responseHelper.successResponse(x, StatusCodes.OK);
    
// }

export default{
    uploadDocuments,
    uploadFile
    // listDocuments
}