import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;

const createClient = async (params) => {
  return await DB.Client.create({
    ...params,
  });
};

const getClient = async (currentIndustry) => {
  return DB.Client.findAll({
    where: {
      sector: {
        [Op.iLike]: `%${currentIndustry}%`,
      },
    },
    order: [["id", "DESC"]],
  });
};

const getAllClients = async () => {
  return DB.Client.findAll();
};

export default {
  createClient,
  getClient,
  getAllClients,
};
