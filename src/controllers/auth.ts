import { Request, Response } from 'express'
import authHelper from '../utils/authHelper'
import responseHelper from '../utils/responseHelper'
import user from '../services/user'
import { StatusCodes } from 'http-status-codes'
import { User } from '../models/user'
import { validateUser } from '../validators/userValidation'
import authentication from '../middlewares/authentication'
import jobs from '../services/jobs'
import sendGridMail from '@sendgrid/mail'


const login = async (req: Request, res: Response) => {
  try {
    const userRes: User | null = await user.get(req.body)
    if (!userRes) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.NOT_FOUND,
      )('No User Found')
    } else if (!userRes.dataValues.isActive) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.FORBIDDEN,
      )('User not verified')
    } else {
      const passwordMatch: any = authHelper.authenticatePassword(
        req.body.password,
        userRes?.password,
      )
      if (!passwordMatch) {
        return responseHelper.errorResponse(
          res,
          StatusCodes.UNAUTHORIZED,
        )('Incorrect Email or Password')
      }
      const tokenData = await authentication.generateToken(userRes, res) 
      if (tokenData) {
        responseHelper.loginSuccessResponse(res, StatusCodes.OK)(
          tokenData.accessToken,
          tokenData.refreshToken,
          userRes
        )
      } else {
        responseHelper.errorResponse(
          res,
          StatusCodes.UNAUTHORIZED,
        )('Authentication Failed')
      }
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
    )(error.errors[0].message)
  }
}

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

const register = async (req: Request, res: Response) => {
  try {
    const validate: any = await validateUser(req, res)
    if (validate.error) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
      )(validate.error.message)
    }
    const userRes: User | null = await user.get(req.body)

    if (userRes) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.NOT_FOUND,
      )('Email already registered!')
    } else if (req.body.password !== req.body.password_confirmation) {
      return responseHelper.errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
      )('Password and Confirm password should match!')
    } else {
      let userData = await user.create(req.body)
      if (req.body.email) {
        //Generate OTP
    
        const otp = Math.floor(100000 + Math.random() * 900000);
        const now = new Date()
        const expiration_time = AddMinutesToDate(now, 5)
    
        const email = req.body.email
        const subject = 'Verify Email'
        const body = `<h1>Email Confirmation</h1>
          <h2>Hello ${req.body.first_name + ' ' + req.body.last_name}</h2>
          <p>Thank you for signing up.</p>
          <p>This is your OTP:<h1>${otp}</h1> Valid for 5 mins</p>
          <p>Do not share your OTP with anyone!</p>
          </div>`
    
        sendGridMail.setApiKey(
          process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : '',
        )
    
        function getMessage(email, subject, body) {
          return {
            to: email,
            from: 'therecruitsgroup@gmail.com',
            subject: subject,
            text: 'The Recruits Group Ltd.',
            html: body,
          }
        }
    
        async function sendEmail(email, subject, body) {
          try {
            await sendGridMail.send(getMessage(email, subject, body))
            console.log('Email sent successfully')
          } catch (error) {
            console.error('Error sending test email')
            console.error(error)
            if (error.response) {
              console.error(error.response.body)
            }
          }
        }
    
        (async () => {
          console.log('Sending email')
          await sendEmail(email, subject, body)
        })() 
    
        //Create OTP instance in DB
       await user.updateOtp(
        {
          otp: otp,
          expiration_time: expiration_time,
        },
        userData.id,
      )
      }
     
      return responseHelper.successResponse(
        res,
        StatusCodes.OK,
      )(
        'An Email is sent to your registered mail id, Please verify to proceed!',
        userData
      )
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
    )(error)
  }
}

const verify = async (req: Request, res: Response, next) => {
  try {
    let tokenValidity: any = await authentication.authenticate(req, res, next)
    if(!tokenValidity){
      return responseHelper.successResponse(res, StatusCodes.OK)(
        'Login Successful',
        tokenValidity,
      )
    }else{
      return responseHelper.errorResponse(res, StatusCodes.BAD_REQUEST)(
        'Login Failed',
      )
    }
    
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
    )(error)
  }
}

const verifyRegistration = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.get(req.params.id)
    if (userInfo) {
      const updateStatus = await user.update(req.params.id)
      if (updateStatus) {
        return responseHelper.successResponse(
          res,
          StatusCodes.OK,
        )('Verification Successful')
      }
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
    )(error)
  }
}

const updaterUserInfo = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.getById(req.params.id)
    if (userInfo) {
      const updateStatus = await user.updateUserInfo(req)
      if (updateStatus) {
        return responseHelper.successResponse(
          res,
          StatusCodes.OK,
        )('Details Updated Successfully')
      }
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
    )(error)
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.getById(req.params)

    return responseHelper.successResponse(res, StatusCodes.OK)(
      'Details fetched Successfully',
      userInfo,
    )
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
    )(error.errors[0].message)
  }
}


const verifyOtp = async (req: Request, res: Response) => {
  try {
    let userInfo: any = await user.get(req.body);
    const now=new Date();
    const isExpired = AddMinutesToDate(now, 5);
    
    if(userInfo && userInfo?.otp==req.body.otp && userInfo.expiration_time < isExpired ){
      await user.updateUserActive(userInfo.email)
      return responseHelper.successResponse(res, StatusCodes.OK)(
        'User Verified',
        userInfo
      )
    }else if(userInfo && userInfo?.otp !==req.body.otp){
      return responseHelper.errorResponse(res, StatusCodes.OK)(
        'Otp Invalid',
      )
    }else if(userInfo?.expiration_time > isExpired){
      return responseHelper.errorResponse(res, StatusCodes.OK)(
        'Otp Expired',
      )
    }
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
    )(error.errors[0].message)
  }
}

const appliedJobs = async (req: Request, res: Response) => {
  try {
    const isApplied = await user.get(req.params); 
    if(isApplied?.applied_jobs.includes(req.body.applied_jobs)){
      return responseHelper.successResponse(res, StatusCodes.OK)("Already Applied");
    }  
    const applied = await user.updateAppliedSaved(req.body, req.params.email)
      if(applied){
        return responseHelper.successResponse(res, StatusCodes.OK)("Application Sent");
      }      
} catch (error) {
  responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
}
};

const savedJobs = async (req: Request, res: Response) => {
  try {
    const isSaved = await user.get(req.params); 
    if(isSaved?.saved_jobs.includes(req.body.saved_jobs)){
      return responseHelper.successResponse(res, StatusCodes.OK)("Already Saved");
    }  
    const saved = await user.updateAppliedSaved(req.body, req.params.email)
      if(saved){
        return responseHelper.successResponse(res, StatusCodes.OK)("Saved");
      }      
} catch (error) {
  responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
}
};

const getSavedJobs = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.get(req.params);
    const jobsData = await jobs.listSavedApplied(userInfo?.saved_jobs); 
    if(jobsData){
      return responseHelper.successResponse(res, StatusCodes.OK)("Saved Jobs List", jobsData);
    }  else{
      return responseHelper.errorResponse(res, StatusCodes.BAD_REQUEST)("No Jobs Saved");
    }
         
} catch (error) {
  responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
}
};

const getAppliedJobs = async (req: Request, res: Response) => {
  try {
    const userInfo = await user.get(req.params);
    const jobsData = await jobs.listSavedApplied(userInfo?.applied_jobs); 
    if(jobsData){
      return responseHelper.successResponse(res, StatusCodes.OK)("Applied Jobs List", jobsData);
    }  else{
      return responseHelper.errorResponse(res, StatusCodes.BAD_REQUEST)("No Jobs Applied");
    }
         
} catch (error) {
  responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error.errors[0].message);
}
};

const resendOtp = async (req: Request, res: Response) => {
  try {
    let userData: any = await user.get(req.body)
    if (req.body.email) {
      //Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const now = new Date()
      const expiration_time = AddMinutesToDate(now, 5)
  
      const email = req.body.email
      const subject = 'Verify Email'
      const body = `<h1>Email Confirmation</h1>
        <h2>Hello ${req.body.first_name + ' ' + req.body.last_name}</h2>
        <p>Thank you for signing up.</p>
        <p>This is your OTP:<h1>${otp}</h1> Valid for 5 mins</p>
        <p>Do not share your OTP with anyone!</p>
        </div>`
  
      sendGridMail.setApiKey(
        process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : '',
      )
  
      function getMessage(email, subject, body) {
        return {
          to: email,
          from: 'therecruitsgroup@gmail.com',
          subject: subject,
          text: 'The Recruits Group Ltd.',
          html: body,
        }
      }
  
      async function sendEmail(email, subject, body) {
        try {
          await sendGridMail.send(getMessage(email, subject, body))
          console.log('Email sent successfully')
        } catch (error) {
          console.error('Error sending test email')
          console.error(error)
          if (error.response) {
            console.error(error.response.body)
          }
        }
      }
  
      (async () => {
        console.log('Sending email')
        await sendEmail(email, subject, body)
      })() 
  
      //Create OTP instance in DB
     await user.updateOtp(
      {
        otp: otp,
        expiration_time: expiration_time,
      },
      userData.id,
    )
    }
    return responseHelper.successResponse(
      res,
      StatusCodes.OK,
    )(
      'An Email is sent to your registered mail id, Please verify to proceed!',
    )  
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
  getUser,
  verifyOtp,
  appliedJobs,
  savedJobs,
  getSavedJobs,
  getAppliedJobs,
  resendOtp
}
