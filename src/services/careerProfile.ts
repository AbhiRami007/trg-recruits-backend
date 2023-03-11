import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;

const create = async (params) => {
  return await DB.CareerProfile.create({
    ...params,
  });
};

const get = async (id) => {
  return DB.CareerProfile.findAndCountAll({
    where: {
      userId: {
        [Op.eq]: id,
      },
    },
  });
};

const update = async (body, id) => {
  return DB.CareerProfile.update(body, {
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
};

const deleteProfile = async (body, id) => {
  return DB.CareerProfile.update(body, {
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
  deleteProfile,
};
