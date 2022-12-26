import {Request, Response} from 'express';
import authHelper from '../utils/authHelper';
import responseHelper from '../utils/responseHelper';
import user from '../services/user';
import {StatusCodes} from 'http-status-codes';
import {User} from '../models/user';
import { validateUser } from '../validators/userValidation';
import authentication from '../middlewares/authentication';
import { emailSender } from '../utils/sendEmail';
import { verifyTemplate } from '../assets/email_template/verify';

const login = async (req: Request, res: Response) => {
  try {
      const userRes: User|null = await user.get(req.body);
      if (!userRes) {
        return responseHelper.errorResponse(res, StatusCodes.NOT_FOUND)('No User Found');
      } else if (!userRes.dataValues.is_user_verified) {
        return responseHelper.errorResponse(res, StatusCodes.FORBIDDEN)('User not verified');
        
      } else {
        const passwordMatch: any= authHelper.authenticatePassword( req.body.password, userRes?.password);
        if (!passwordMatch) {
          return responseHelper.errorResponse(
            res,
            StatusCodes.UNAUTHORIZED,
          )('Incorrect Email or Password');
        }
        const tokenData = await authentication.generateToken(userRes, res);
        if (tokenData) {
          responseHelper.loginSuccessResponse(res, StatusCodes.OK)(tokenData.accessToken, tokenData.refreshToken);
        } else {
          responseHelper.errorResponse(res, StatusCodes.UNAUTHORIZED)('Authentication Failed');
        }
      }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const validate: any =  await validateUser(req, res);
    if (validate.error) {
       return responseHelper.errorResponse(res, StatusCodes.BAD_REQUEST)(validate.error.message);
    }
    const userRes: User | null = await user.get(req.body?.email);

      if (userRes) {
        return responseHelper.errorResponse(res, StatusCodes.NOT_FOUND)('Email already registered!');
      } else if (req.body.password !== req.body.password_confirmation) {
        return responseHelper.errorResponse(res, StatusCodes.BAD_REQUEST)('Password and Confirm password should match!');
       }
      else {

        const userRes: any = await user.create(req.body);
        const url = `${process.env.BASE_URL}/users/verify/${userRes?.id}`;
        if (userRes.email) {
           await emailSender(
             userRes.email,
             'Verify Email',
          verifyTemplate(userRes, url)
        );
        return responseHelper.successResponse(res, StatusCodes.OK)( "An Email is sent to your registered mail id, Please verify to proceed!");
        }
        
        return responseHelper.errorResponse(res, StatusCodes.BAD_REQUEST)( "An error occured");
      }
      
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const verify = async (req: Request, res: Response) => {
  try {
    let tokenValidity = await authentication.authenticate(req, res) 
    tokenValidity={...tokenValidity}
    return responseHelper.successResponse(res, StatusCodes.OK)("Login Successful", tokenValidity);
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};


const verifyRegistration = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.get(req.params.id);
    if (userInfo) {
      const updateStatus = await user.update(req.params.id)
      if (updateStatus) {
        return responseHelper.successResponse(res, StatusCodes.OK)("Verification Successful");
      }
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const updaterUserInfo = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.getById(req.params.id);
    if (userInfo) {
      const updateStatus = await user.updateUserInfo(req)
      if (updateStatus) {
        return responseHelper.successResponse(res, StatusCodes.OK)("Details Updated Successfully");
      }
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.get(req.params);
   
        return responseHelper.successResponse(res, StatusCodes.OK)("Details fetched Successfully", userInfo);
      
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};



export default {
  login,
  register,
  verify,
  verifyRegistration,
  updaterUserInfo,
  getUser
};
