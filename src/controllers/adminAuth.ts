import { Request, Response } from "express";
import authHelper from "../utils/authHelper";
import responseHelper from "../utils/responseHelper";
import { StatusCodes } from "http-status-codes";
import { Admin } from "../models/admin";
import { validateUser } from "../validators/userValidation";
import authentication from "../middlewares/authentication";
import { otpGenerator } from "../utils/otp";
import { OAuth2Client } from "google-auth-library";
import { sendVerificationEmail } from "../utils/email";
import { CONFIG } from "../config/env";
import axios from "axios";
import admin from "../services/admin";
import user from "../services/user";

const keys = CONFIG.GOOGLE;
const oAuth2Client = new OAuth2Client(
  keys.clientId,
  keys.clientSecret,
  keys.redirectUriAdmin
);

const getAccessToken = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  return tokens;
};

const login = async (req: Request, res: Response) => {
  try {
    const userRes: Admin | null = await admin.get(req.body.email);
    if (!userRes || userRes.dataValues.is_delete) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("Incorrect Credential");
    } else if (!userRes?.password) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.UNAUTHORIZED
      )("Incorrect Email or Password");
    } else {
      const passwordMatch: any = authHelper.authenticatePassword(
        req.body.password,
        userRes?.password
      );
      if (!passwordMatch) {
        return responseHelper.errorResponse(
          res,
          StatusCodes.UNAUTHORIZED
        )("Incorrect Email or Password");
      }
      const tokenData = await authentication.generateToken(userRes, res);
      if (tokenData) {
        responseHelper.loginSuccessResponse(res, StatusCodes.OK)(
          tokenData.accessToken,
          tokenData.refreshToken,
          tokenData.userId
        );
      } else {
        responseHelper.errorResponse(
          res,
          StatusCodes.UNAUTHORIZED
        )("Authentication Failed");
      }
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const googleLogin = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken(req.query.code);
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${token.access_token}`,
      {
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "identity",
        },
      }
    );
    const acceptedEmail = [
      "akashsasikumar@outlook.com",
      "therecruitsgroup@gmail.com",
      "psabhirami015@gmail.com",
      "abhishekomanakuttansheeba@gmail.com",
    ];
    if (acceptedEmail.includes(data.email)) {
      let userData = await admin.get(data.email);
      if (!userData) {
        const reqBody = {
          name: data.given_name + " " + data.family_name,
          email: data.email,
          avatar: data.picture,
          is_active: true,
          is_user_verified: data.email_verified,
          joined_on: new Date(),
        };
        userData = await admin.create(reqBody);
      }
      const tokenData = await authentication.generateToken(userData, res);
      if (tokenData) {
        responseHelper.loginSuccessResponse(res, StatusCodes.OK)(
          tokenData.accessToken,
          tokenData.refreshToken,
          tokenData.userId
        );
      }
    } else {
      responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("This email Id is not recognized");
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const validate: any = await validateUser(req, res);
    if (validate.error) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )(validate.error.message);
    }
    const acceptedEmail = [
      "akashsasikumar@outlook.com",
      "therecruitsgroup@gmail.com",
      "psabhirami015@gmail.com",
      "abhishekomanakuttansheeba@gmail.com",
    ];
    if (acceptedEmail.includes(req.body.email)) {
      const userRes: Admin | null = await admin.get(req.body.email);

      if (userRes) {
        return responseHelper.errorResponse(
          res,
          StatusCodes.NOT_FOUND
        )("Email already registered!");
      } else if (req.body.password !== req.body.password_confirmation) {
        return responseHelper.errorResponse(
          res,
          StatusCodes.BAD_REQUEST
        )("Password and Confirm password should match!");
      } else {
        let userData;
        if (!userRes) {
          userData = await admin.create(req.body);
        }
        return responseHelper.successResponse(res, StatusCodes.OK)(
          "Registered",
          userData
        );
      }
    } else {
      responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("This email Id is not recognized");
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
};

const verify = async (req: Request, res: Response, next: any) => {
  try {
    let data: any = await authentication.authenticate(req, res, "admin", next);
    if (data) {
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "Login Successful",
        data
      );
    } else {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("Login Failed");
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
};

const updaterUserInfo = async (req: Request, res: Response) => {
  try {
    const userInfo = await admin.getById(req.params.id);
    if (userInfo) {
      let hash: string;
      if (req.body.password) {
        hash = await authHelper.hashData(req.body.password);
        req.body.password = hash;
      }
      const updateStatus = await admin.update(req.body, req.params.id);
      if (updateStatus) {
        return responseHelper.successResponse(
          res,
          StatusCodes.OK
        )("Details Updated Successfully");
      }
    }
  } catch (error) {
    responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.getById(req.params.id);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Details fetched Successfully",
      userInfo
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getUserByIds = async (req: Request, res: Response) => {
  try {
    const ids: any = (req.query.id as string)?.split(",");
    const userInfo = await user.getByIds(ids);
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Details fetched Successfully",
      userInfo
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    let userInfo: any = await admin.get(req.body.email);
    const otpInfo = await otpGenerator();
    const isExpired = otpInfo.expiration_time;
    const otp = await authHelper.authenticatePassword(
      req.body.otp,
      userInfo?.otp
    );

    if (userInfo && otp && userInfo.expiration_time < isExpired) {
      await admin.updateByEmail({ is_active: true }, userInfo.email);
      return responseHelper.successResponse(res, StatusCodes.OK)(
        "User Verified",
        userInfo
      );
    } else if (userInfo && !otp) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("Otp Invalid");
    } else if (userInfo?.expiration_time > isExpired) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("Otp Expired");
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const resendOtp = async (req: Request, res: Response) => {
  try {
    let userData: any = await admin.get(req.body.email);
    if (req.body.email) {
      //Generate OTP
      const otpInfo = otpGenerator();
      //update email or verify existing email
      const email = req.body.newemail ? req.body.newemail : req.body.email;
      const subject = "Verify Email";
      const body = `<h1>Email Confirmation</h1>
        <h2>Hello ${userData.first_name + " " + userData.last_name}</h2>
        <p>Thank you for signing up.</p>
        <p>This is your OTP:<h1>${otpInfo.otp}</h1> Valid for 5 mins</p>
        <p>Do not share your OTP with anyone!</p>
        </div>`;

      await sendVerificationEmail(email, subject, body);

      const otp = await authHelper.hashData(otpInfo.otp);
      //OTP instance in DB
      await admin.update(
        {
          otp: otp,
          expiration_time: otpInfo.expiration_time,
        },
        userData.id
      );
    }
    return responseHelper.successResponse(
      res,
      StatusCodes.OK
    )("An Email is sent to your registered mail id, Please verify to proceed!");
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    let userData: any = await admin.get(req.body);
    const url = `${CONFIG.REACT_BASE_URL}/auth/password-reset/${userData.id}`;
    if (req.body.email) {
      const email = req.body.email;
      const subject = "Password Reset";
      const body = `<h1>Password Reset Link </h1>
        <h2>Hello ${userData.first_name + " " + userData.last_name}</h2>
        <p>Click on the link to reset your password.</p>
        <p>${url}</h1>
        </div>`;

      await sendVerificationEmail(email, subject, body);
    }
    return responseHelper.successResponse(
      res,
      StatusCodes.OK
    )(
      "An Email with link to reset your password has been sent to you email id"
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};
const checkPassword = async (req: Request, res: Response) => {
  try {
    const userInfo = await admin.get(req.body);
    const password = authHelper.authenticatePassword(
      req.body.password,
      userInfo?.password
    );
    if (password) {
      return responseHelper.successResponse(res, StatusCodes.OK)("Ok");
    } else {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST
      )("Password Incorrect");
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const userInfo = await user.list();
    return responseHelper.successResponse(res, StatusCodes.OK)(
      "Details fetched Successfully",
      userInfo
    );
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error.errors[0].message);
  }
};

export default {
  login,
  register,
  verify,
  updaterUserInfo,
  getUser,
  verifyOtp,
  resendOtp,
  checkPassword,
  forgotPassword,
  googleLogin,
  getAllUsers,
  getUserByIds,
};
