/* eslint-disable security/detect-non-literal-regexp */
import moment from "moment";
import { Op } from "sequelize";
import DB from "../models/index";
import { getSocketIO } from "../utils/socketio.js";
import { logUserActions, userActions } from "./logUserActions";

const list = async (userId) => {
  const userMap = await DB.UserActionsMap.findAll({
    where: { [Op.and]: { notifyUserId: userId } },
  });
  const ids = userMap.map((item) => item.userActionId);
  const userActions = await DB.UserActions.findAll({
    where: { id: { [Op.in]: ids } },
    order: [["id", "DESC"]],
  });
  userActions.map((data) => {
    data["isRead"] = false;
  });
  return userActions;
};

const update = async (userId) => {
  const userMap = await DB.UserActions.findAll();
  const ids = userMap.map((item) => item.id);
  const notifedUsers = await DB.UserActionsMap.findAll({
    where: { [Op.and]: { id: { [Op.in]: ids }, notifyUserId: userId } },
  });
  const notifiedIds = notifedUsers.map((item) => item.notifyUserId);
  const userActions = await DB.UserActionsMap.update(
    { isRead: true },
    { where: { notifyUserId: { [Op.in]: notifiedIds } } }
  );

  return userActions;
};

const updateNew = async (userId) => {
  const userMap = await DB.UserActions.findAll();
  const ids = userMap.map((item) => item.id);
  const notifedUsers = await DB.UserActionsMap.findAll({
    where: { [Op.and]: { id: { [Op.in]: ids }, notifyUserId: userId } },
  });
  const notifiedIds = notifedUsers.map((item) => item.notifyUserId);
  const userActions = await DB.UserActionsMap.update(
    { isNew: false },
    { where: { notifyUserId: { [Op.in]: notifiedIds } } }
  );

  return userActions;
};

const countNew = async (userId) => {
  const data = await DB.UserActionsMap.count({
    where: { notifyUserId: userId, isNew: true },
  });

  return data;
};

const sendJobPostNotification = async (notifyUser, payload) => {
  const userActionDetails = await logUserActions({
    actionId: payload.id,
    action: userActions.AddNewJob,
    comments: `A new job has been posted for ${payload.title} on ${moment(
      payload.created_on
    ).format("DD-MM-YYYY")}`,
    notifyUserId: notifyUser,
    isAlert: false,
  });
  const userSocketConnections = await DB.UserSocket.findAll({
    where: {
      userId: { [Op.in]: notifyUser },
    },
  });

  userSocketConnections.map((x) => {
    getSocketIO().to(x.socketId).emit("sendNotification", userActionDetails);
  });
};

export default { list, sendJobPostNotification, update, updateNew, countNew };
