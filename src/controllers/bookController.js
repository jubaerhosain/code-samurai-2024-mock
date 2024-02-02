import { models } from "../configs/mysql.js";
import { Joi } from "../utils/Joi.js";

async function addBook(req, res) {

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

async function getParticularBook(req, res) {

    const bookID = req.params.id;
    
    const fetchedBook = await models.Book.findByPk(bookID);

    if(fetchedBook == null) {
        res.status(404).json({
            message: `book with id: ${bookID} was not found`
        })
    }

    res.status(200).json(fetchedBook);
}

export default { addBook, getParticularBook };

