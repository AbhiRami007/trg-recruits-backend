import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { error } from "winston";
import responseHelper from "../utils/responseHelper";

const validateUser = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required(),
      role: Joi.optional(),
    });
    const result = await schema.validate(req.body);
    return result;
  } catch (err) {
    return responseHelper.errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR
    )(error);
  }
};

export { validateUser };
