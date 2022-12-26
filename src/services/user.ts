import sequelize from 'sequelize';
import DB from '../models/index';
const Op = sequelize.Op;
import bcrypt from 'bcryptjs';
import { CONFIG } from '../config/env';

const create = async (params) => {
  const hash=await bcrypt.hash(params.password,  Number(CONFIG.SALT))
  params={...params, password: hash}
  return await DB.User.create({
    ...params,
  });
};

const get = async (user) => {
  return DB.User.findOne({
    // attributes: ['id', 'first_name', 'last_name', 'email', 'password','role'],
    where: {
      email: {
        [Op.eq]: user.email,
      },
    },
  });
};

const getById = async (user) => {
  return DB.User.findOne({
    // attributes: ['id', 'first_name', 'last_name', 'email', 'password','role'],
    where: {
      id: {
        [Op.eq]: user,
      },
    },
  });
};


const update = async (user) => {
  return DB.User.update({isUserVerified:true}, {
    where: {
      id: {
        [Op.eq]: user,
      },
    },
  });
};

const updateUserInfo = async (req) => {
  return DB.User.update(req.body.reqBody, {
    where: {
      id: {
        [Op.eq]: req.params.id,
      },
    },
  });
};

export default {
  create,
  get,
  updateUserInfo,
  update,
  getById
};
