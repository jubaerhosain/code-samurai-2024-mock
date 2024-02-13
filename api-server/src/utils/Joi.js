import joi from "joi";

export const Joi = joi.defaults((schema) => {
    return schema.options({
        abortEarly: false,
    });
});

export const formatError = (joiError) => {
    const formattedErrors = {};
    joiError.details.forEach((detail) => {
        const key = detail.context.label;
        const message = detail.message;
        if (!formattedErrors[key]) {
            let msg = message.replace(/(\")/g, "");
            msg = msg.replace(/.*\.(.*)$/, "$1");
            formattedErrors[key] = msg;
        }
    });
    return formattedErrors;
};
