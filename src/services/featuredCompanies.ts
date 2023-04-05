import sequelize from "sequelize";
import DB from "../models/index";
const Op = sequelize.Op;

const createClient = async (params) => {
  return await DB.Companies.create({
    ...params,
  });
};

const getClient = async (currentIndustry) => {
  return DB.Companies.findAll({
    where: {
      sector: {
        [Op.iLike]: `%${currentIndustry}%`,
      },
    },
    order: [["id", "DESC"]],
  });
};

const getAllClients = async () => {
  return DB.Companies.findAll();
};

export default {
  createClient,
  getClient,
  getAllClients,
};
