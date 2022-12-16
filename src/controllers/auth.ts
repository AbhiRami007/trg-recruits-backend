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

        const userRes: any= await user.create(req.body);
          return responseHelper.successResponse(res, StatusCodes.OK)("User Registered", userRes);
      }
      
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};

const verify = async (req: Request, res: Response) => {
  try {
    let tokenValidity = await authentication.authenticate(req, res) 
    tokenValidity={...tokenValidity, password:"****"}
    return responseHelper.successResponse(res, StatusCodes.OK)("Login Successful", tokenValidity);
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
  }
};



export default {
  login,
  register,
  verify
};
