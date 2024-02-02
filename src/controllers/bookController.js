import { Joi } from "../utils/Joi.js";
import { models } from "../configs/mysql.js";

async function createBook(req, res) {
    const bookDto = req.body;
    const bookSchema = Joi.object({
        id: Joi.number().integer().optional(),
        title: Joi.string().required(),
        author: Joi.string().required(),
        genre: Joi.string().required(),
        price: Joi.number().required(),
    }).required();

    const { error } = bookSchema.validate(bookDto);
    if (error) return res.status(400).json(error.details);

    // check if id is already exists

    const post = await models.Book.create(bookDto);

    res.status(201).json(post);
}

export default { createBook };
