import sequelize from 'sequelize';
import DB from '../models/index';
const Op = sequelize.Op;
import bcrypt from 'bcryptjs';
import { CONFIG } from '../config/env';

const create = async (params) => {
  const user = await DB.User.create({
    ...params,
  });

  bcrypt.hash(params.password,  Number(CONFIG.SALT), (err, hash) => {
    if (err) {
      throw err;
    }
    DB.User.update(
      {password: hash},
      {
        where: {
          id: {
            [Op.eq]: user.id,
          },
        },
      },
    );
  });
};

const get = async (user) => {
  return DB.User.findOne({
    attributes: ['id', 'firstname', 'lastname', 'email', 'password','role'],
    where: {
      email: {
        [Op.eq]: user.email,
      },
    },
  });
};

export default {
  create,
  get,
};
