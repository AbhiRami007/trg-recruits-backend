import { Op } from "sequelize";
import DB from "../models/index";
import careerProfile from "./careerProfile";
import user from "./user";

const createSocketConnection = async (socketId, userIds) => {
  try {
    let createData: any = [];
    const userSocketConnections = await DB.UserSocket.findOne({
      where: { socketId, userId: { [Op.in]: userIds } },
    });
    if (userSocketConnections) {
      return true;
    }
    if (userIds.length > 0) {
      userIds.map((user) => {
        createData.push(DB.UserSocket.create({ socketId, userId: user }));
      });
    }
    const data = await Promise.all(createData);
    return data;
  } catch (error) {
    return error;
    // need to handle it
  }
};

const getUsersToNotify = async (jobInfo) => {
  let userData: any = await careerProfile.getByKey(jobInfo?.data?.data?.job_keywords);
  if (!userData.length) {
    userData = await user.list();
  }
  const notifyUserIds = userData.map((x) => x.userId ?? x.id);
  return notifyUserIds;
};

const deleteSocketConnection = async (socketId) => {
  return DB.UserSocket.destroy({ where: { socketId } });
};

export default {
  createSocketConnection,
  deleteSocketConnection,
  getUsersToNotify
};
