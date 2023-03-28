import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;

const create = async (params) => {
  return await DB.Jobs.create({
    ...params,
  });
};

const get = async (searchTerm, location) => {
  return DB.Jobs.findAndCountAll({
    where: {
      [Op.and]: {
        location: {
          [Op.iLike]: `%${location}%`,
        },
        title: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
    },
  });
};

const getByTitle = async (title) => {
  return DB.Jobs.findAndCountAll({
    where: {
      [Op.or]: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
        company: {
          [Op.iLike]: `%${title}%`,
        },
      },
    },
  });
};

const getByLocation = async (location) => {
  return DB.Jobs.findAndCountAll({
    where: {
      location: {
        [Op.iLike]: `%${location}%`,
      },
    },
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
      is_delete: false,
    },
  });
};

const update = async (id, job) => {
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
    { is_delete: true, is_active: false },
    {
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    }
  );
};

const listJobsById = async (req) => {
  return DB.Jobs.findAndCountAll({
    where: {
      id: {
        [Op.in]: req,
      },
    },
  });
};

const listRecommended = async (values) => {
  return DB.Jobs.findAndCountAll({
    where: {
      is_delete: false,
      [Op.or]: {
        title: {
          [Op.iLike]: `%${values?.job_role??''}%`,
        },
        company_type: {
          [Op.iLike]: `%${values?.role_category??''}%`,
        },
      },
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
  listJobsById,
  getByLocation,
  listRecommended,
};
