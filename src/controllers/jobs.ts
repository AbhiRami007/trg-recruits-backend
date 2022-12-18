import {Request, Response} from 'express';
import passport from 'passport';
import JsonStrategy from 'passport-json';
import authHelper from '../utils/authHelper';
import responseHelper from '../utils/responseHelper';
import user from '../services/user';
import {StatusCodes} from 'http-status-codes';
import {User} from '../models/user';
import { validateUser } from '../validators/userValidation';
import authentication from '../middlewares/authentication';
import { emailSender } from '../utils/sendEmail';
import { verifyTemplate } from '../assets/email_template/verify';
import jobs from '../services/jobs';

const login = async (req: Request, res: Response) => {
  try {
    const passportResponse: any= passport.use(
      new JsonStrategy(
        {
          usernameProp: 'email',
          passwordProp: 'password',
          session: false,
        },
        function(username, _password, _done) {
          user.get(username).then((user) => {
            if (!user) {
              return false;
            }
            return user;
          });
        },
      ),
    );
    if (passportResponse) {
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
