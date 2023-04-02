import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;

const create = async (params) => {
  return await DB.CareerProfile.create({
    ...params,
  });
};

const get = async (id) => {
  return DB.CareerProfile.findOne({
    where: {
      [Op.and]: {
        userId: {
          [Op.eq]: id,
        },
        is_delete: {
          [Op.eq]: false,
        },
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

const getByKey = async (keyList) => {
  return DB.CareerProfile.findAll({
    where: {
      [Op.and]: {
        current_industry: {
          [Op.in]: keyList,
        },
        is_delete: {
          [Op.eq]: false,
        },
      },
    },
  });
};

export default {
  create,
  get,
  update,
  deleteProfile,
  getByKey,
};
