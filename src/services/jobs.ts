import sequelize from 'sequelize';
import DB from '../models/index';
const Op = sequelize.Op;

const create = async (params) => {
  return await DB.Jobs.create({
    ...params,
  });
};

const get = async (searchTerm, location) => {
    return DB.Jobs.findAll({
        where: {
            [Op.and]: {
        location: {
            [Op.eq]: location,
        },
        title: {
            [Op.eq]: searchTerm,
        },
                
    }
    },
  });
};

const getByTitle = async (title) => {
    return DB.Jobs.findAll({
        where: {
          title
      }
  });
};

const getById = async (id) => {
  return DB.Jobs.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
};

const list = async () => {
  return DB.Jobs.findAndCountAll({
    where: {
      isDelete: false,
    },
  });
};


const update = async (id,job) => {
  return DB.Jobs.update(job, {
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
};

const remove = async (id: any) => {
  return DB.Jobs.update(
    {isDelete: true, isActive: false},
    {
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    },
  );
};

const listJobsById = async (req) => {
  return DB.Jobs.findAndCountAll({
    where: {
      id:{
        [Op.in]:req
      }
    },
  });
};

export default {
  create,
  get,
  remove,
  update,
    getById,
    getByTitle,
  list,
  listJobsById
};
