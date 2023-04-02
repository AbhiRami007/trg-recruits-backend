import moment from "moment";
import DB from "../models/index";

const userActions = {
  Login: "login",
  OTPRequest: "otp-request",
  ForgotPassword: "forgot-password",
  AddNewJob: "add-new-job",
  PostedComment: "posted-a-comment",
  ToDoReminder: "to-do-reminder",
  VerifyMobile: "verify-mobile",
};

const logUserActions = async (payload) => {
  const { actionId, action, comments, notifyUserId, isAlert } = payload;
  try {
    if (action === userActions.AddNewJob) {
      const entry = await DB.UserActions.findOne({
        raw: true,
        where: {
          actionId,
          action,
        },
        order: [["id", "DESC"]],
      });
      if (entry && moment().diff(entry.timestamp, "minutes") < 60) return;
    }
    const userAction = await DB.UserActions.create({
      actionId,
      action,
      comments,
      isAlert,
    });
    if (notifyUserId?.length) {
      const userActionMap: any[] = [];
      notifyUserId.map((id) => {
        const data = {
          userActionId: userAction.id,
          notifyUserId: id,
        };
        return userActionMap.push(data);
      });
      await DB.UserActionsMap.bulkCreate(userActionMap);
      return userAction;
    }
    return userAction;
  } catch (error) {
    return error;
  }
};

export { userActions, logUserActions };
