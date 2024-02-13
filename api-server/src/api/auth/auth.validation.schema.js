import { Joi } from "../../utils/Joi.js";

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().empty().required(),
}).required();

export const signUpSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    // role: Joi.string().trim().required().valid("admin", "user"),
}).required();