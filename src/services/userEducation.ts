import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;

const create = async (params) => {
  return await DB.Education.create({
    ...params,
  });
};

const get = async (id) => {
  return DB.Education.findAndCountAll({
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
  return DB.Education.update(body, {
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
};

const deleteEd = async (body, id) => {
  return DB.Education.update(body, {
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
  deleteEd,
};
