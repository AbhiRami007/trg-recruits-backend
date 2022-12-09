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
    confirm_password: Joi.string().required(),
    phone:Joi.number().required(),
    address: Joi.string().required(),
    userRole: Joi.string()
})
        const result = await schema.validate(req.body);
        return result
    }
    catch (err) { 
        return responseHelper.errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR)(error);
    }
}

export {
    validateUser
}