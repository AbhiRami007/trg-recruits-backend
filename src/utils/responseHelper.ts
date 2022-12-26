import {Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const loginSuccessResponse =
  (res: Response, status?: number) => (accessToken, refreshToken) => {
    const access = 'Bearer ' + accessToken;
    res.setHeader('Access-Token', access);
    res.setHeader('Refresh-Token', refreshToken);
    res.status(status || StatusCodes.OK).json({
      api_token: accessToken,
      refreshToken: refreshToken,
    });
  };

const errorResponse = (res: Response, status?: number) => (message?: any) => {
  res.status(status || StatusCodes.NOT_FOUND).json({
    message,
    data: null,
  });
};

const successResponse =
  (res: Response, status?: number) => (message: any, body?: any) => {
    res.status(status || StatusCodes.OK).json({
      message,
      data: body,
    });
  };


export default {
  loginSuccessResponse,
  successResponse,
  errorResponse,
};
