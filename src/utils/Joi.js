import joi from "joi";
export const Joi = joi.defaults((schema) => {
    return schema.options({
        abortEarly: false,
    });
});
