import {Request, Response} from 'express';
import responseHelper from '../utils/responseHelper';
import {StatusCodes} from 'http-status-codes';
import comments from '../services/comments';

const createComment = async (req: Request, res: Response) => {
  try {
    const CommentInfo = await comments.create(req.body);
    if (CommentInfo) {
        return responseHelper.successResponse(res, StatusCodes.OK)("Comment added Successfully", CommentInfo);
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const getComments = async (req: Request, res: Response) => {
    try {
      const CommentInfo = await comments.get(req.params);
      if (CommentInfo) {
          return responseHelper.successResponse(res, StatusCodes.OK)("Comment fetched Successfully", CommentInfo);
      }
    } catch (error) {
      responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
    }
  };


export default {
    createComment,
    getComments
    
};
