import { StatusCodes } from "http-status-codes";
import notificationService from "../services/userSocketNotification";
import responseHelper from "../utils/responseHelper";
// import userSocketNotification from "../services/userSocketNotification";

// const sendJobNotification = () => {
//   const jobInfo = await
//   return userSocketNotification.sendJobPostNotification(req.params.id, jobInfo);
// };

const list = async (req, res) => {
  try {
    const userId = req.params.id;
    const notificationList = await notificationService.list(userId);
    responseHelper.successResponse(res, StatusCodes.OK)(notificationList);
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.BAD_REQUEST
    )("Unable to list notifications");
  }
};

const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const notificationList = await notificationService.update(userId);
    responseHelper.successResponse(res, StatusCodes.OK)(notificationList);
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.BAD_REQUEST
    )("Unable to Update notifications");
  }
};

const updateNew = async (req, res) => {
  try {
    const userId = req.params.id;
    const notificationList = await notificationService.updateNew(userId);
    responseHelper.successResponse(res, StatusCodes.OK)(notificationList);
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.BAD_REQUEST
    )("Unable to Update notifications");
  }
};

const countNew = async (req, res) => {
  try {
    const userId = req.params.id;
    const notificationList = await notificationService.countNew(userId);
    responseHelper.successResponse(res, StatusCodes.OK)(notificationList);
  } catch (error) {
    responseHelper.errorResponse(
      res,
      StatusCodes.BAD_REQUEST
    )("Unable to Update notifications");
  }
};

export default { list, update, updateNew, countNew };
