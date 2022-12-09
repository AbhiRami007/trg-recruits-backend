import {NextFunction, Request, Response} from 'express';
import responseHelper from '../utils/responseHelper';

/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
*/

export function catchErrors(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
}

export function handleErrors() {
  return (err: any, _req: Request, res: Response, next: NextFunction) => {
    if (!err) {
      next();
    }

    const error:any = {
      message:
        err.message && err.message.indexOf('_') !== -1 ?
          err.message :
          'SERVER_ERROR',
    };
    responseHelper.errorResponse(res)((error.message));
  };
}
