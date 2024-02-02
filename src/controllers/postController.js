import { Joi } from "../utils/Joi.js";
import { models } from "../configs/mysql.js";

async function createPost(req, res) {
    const postDto = req.body;
    const schema = Joi.object({
        title: Joi.string().trim().required(),
        content: Joi.string().required(),
        published: Joi.boolean().required(),
    }).required();

    const { error } = schema.validate(postDto);
    if (error) return res.status(400).json(error);

    const post = await models.Post.create(postDto);

    res.status(201).json(post);
}

export default { createPost };
