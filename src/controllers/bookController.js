import { Joi } from "../utils/Joi.js";
import { models, Sequelize } from "../configs/mysql.js";

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

    if (bookDto.id) {
        const existed = await models.Book.findByPk(bookDto.id);
        if (existed) return res.status(409).json({ message: `book with id: ${bookDto.id} already exists` });
    }

    const post = await models.Book.create(bookDto);

    res.status(201).json(post);
}

async function updateBook(req, res) {
    const id = req.params.id;

    const book = await models.Book.findByPk(id, { raw: true });

    if (!book) {
        return res.status(404).json({ message: `book with id: ${id} was not found` });
    }

    const bookDto = req.body;
    book.title = bookDto.title ?? book.title;
    book.author = bookDto.author ?? book.author;
    book.genre = bookDto.genre ?? book.genre;
    book.price = bookDto.price ?? book.price;

    // const bookSchema = Joi.object({
    //     title: Joi.string().optional(),
    //     author: Joi.string().optional(),
    //     genre: Joi.string().optional(),
    //     price: Joi.number().optional(),
    // });

    // const { error } = bookSchema.validate(bookDto);
    // if (error) return res.status(400).json(error.details);

    await models.Book.update(book, {
        where: { id: id },
        returning: true,
    });

    res.status(200).json(book);
}

async function findOneBook(req, res) {
    const id = req.params.id;

    const book = await models.Book.findByPk(id);

    if (!book) {
        return res.status(404).json({ message: `book with id: ${id} was not found` });
    }

    res.status(200).json(book);
}

async function findAllBook(req, res) {
    const { title, author, genre, sort = "id", order = "ASC" } = req.query;

    const searchConditions = {};
    if (title) {
        searchConditions.title = title;
    }
    if (author) {
        searchConditions.author = author;
    }
    if (genre) {
        searchConditions.genre = genre;
    }

    const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const books = await models.Book.findAll({
        where: searchConditions,
        order: [
            [sort, sortOrder],
            ["id", "ASC"], 
        ],
    });

    res.status(200).json({ books });
}

export default { createBook, updateBook, findAllBook, findOneBook };
