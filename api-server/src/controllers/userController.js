import { models } from "../configs/mysql.js";
import { Joi } from "../utils/Joi.js";


async function createUser(req, res) {

    const userDto = req.body;
    const userSchema = Joi.object({
        user_id: Joi.number().integer().required(),
        user_name: Joi.string().required(),
        balance: Joi.number().required()
    })

    const { error } = userSchema.validate(userDto);
    if (error) return res.status(400).json(error.details);

    if (userDto.user_id) {
        const existed = await models.User.findByPk(userDto.user_id);
        if (existed) return res.status(409).json({ message: `user with id: ${userDto.user_id} already exists` })
    }
    
    const post = await models.User.create(userDto);
    
    res.status(201).json(post)
}

export default { createUser }