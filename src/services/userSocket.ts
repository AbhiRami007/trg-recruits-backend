import DB from "../models/index";

const createSocketConnection = async (socketId, userId) => {
  try {
    const userSocketConnections = await DB.UserSocket.findOne({
      where: { socketId, userId },
    });
    if (userSocketConnections) {
      return true;
    }
    return DB.UserSocket.create({ socketId, userId });
  } catch (error) {
    return error;
    // need to handle it
  }
};

const deleteSocketConnection = async (socketId) => {
  return DB.UserSocket.destroy({ where: { socketId } });
};

export default {
  createSocketConnection,
  deleteSocketConnection,
};
