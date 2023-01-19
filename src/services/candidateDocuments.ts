import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;

const create = async (params) => {
  return await DB.CandidateDocuments.create({
    ...params,
  });
};

const update = async (userId, body) => {
  return DB.CandidateDocuments.update(body, {
    where: {
      userId: {
        [Op.eq]: userId,
      },
    },
  });
};
const get = async (email) => {
  return DB.CandidateDocuments.findAndCountAll({
    // attributes: ['id', 'first_name', 'last_name', 'email', 'password','role'],
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
};

const getById = async (id) => {
  return DB.CandidateDocuments.findOne({
    // attributes: ['id', 'first_name', 'last_name', 'email', 'password','role'],
    where: {
      userId: {
        [Op.eq]: id,
      },
    },
  });
};

const getByIds = async (id) => {
  return DB.CandidateDocuments.findAndCountAll({
    where: {
      id: {
        [Op.in]: id,
      },
    },
  });
};

export default {
  create,
  get,
  update,
  getById,
  getByIds,
};
