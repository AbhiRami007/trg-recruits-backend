import sequelize from 'sequelize';
import DB from '../models/index';
const Op = sequelize.Op;

const create = async (params) => {
  return await DB.Comments.create({
    ...params,
  });
};

const get = async (user) => {
  return DB.User.findAndCountAll({
    // attributes: ['id', 'first_name', 'last_name', 'email', 'password','role'],
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
