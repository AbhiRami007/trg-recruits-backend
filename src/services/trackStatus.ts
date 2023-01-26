import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;

const create = async (params) => {
  return await DB.TrackStatus.create({
    ...params,
  });
};

const get = async (id) => {
  return DB.TrackStatus.findOne({
    // attributes: ['id', 'first_name', 'last_name', 'email', 'password','role'],
    where: {
      userId: {
        [Op.eq]: id,
      },
    },
  });
};

const update = async (id, status) => {
  return DB.TrackStatus.update(status, {
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
};

export default {
  create,
  get,
  update,
};
