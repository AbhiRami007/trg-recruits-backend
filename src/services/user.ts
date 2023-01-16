import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;
import bcrypt from "bcryptjs";
import { CONFIG } from "../config/env";

const create = async (params) => {
  if (params.password) {
    const hash = await bcrypt.hash(params.password, Number(CONFIG.SALT));
    params = { ...params, password: hash };
  }
  return await DB.User.create({
    ...params,
  });
};

const get = async (email) => {
  return DB.User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
};

const getById = async (id) => {
  return DB.User.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
};

const update = async (body, id) => {
  return DB.User.update(body, {
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
};

const updateByEmail = async (body, email) => {
  return DB.User.update(body, {
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
};

const list = async () => {
  return DB.User.findAndCountAll({
    where: {
      role: {
        [Op.eq]: "candidate",
      },
    },
  });
};

export default {
  create,
  get,
  update,
  getById,
  updateByEmail,
  list,
};
