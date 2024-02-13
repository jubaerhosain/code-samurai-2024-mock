import { Joi, formatError } from "../utils/Joi.js";

export const schemaValidator = (schema, location = "body") => {
    return async (req, res, next) => {
        try {
            if (Joi.isSchema(schema)) {
                console.log("Invalid joi schema");
                return res.status(500).json({ message: "Internal Server Error" });
            }
            const dto = req[location];
            const { error } = schema.validate(dto);
            if (error) return res.status(400).json(formatError(error));
            else next();
        } catch (error) {
            res.status(400).json({ message: "An error occurred while validating the schema" });
        }
    };
};
