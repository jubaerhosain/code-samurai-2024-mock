import express from "express";
const bookRoutes = express.Router();

import bookController from "../controllers/bookController.js";

bookRoutes.post("/books", bookController.createBook);
bookRoutes.put("/books/:id", bookController.updateBook);
bookRoutes.get("/books", bookController.findAllBook);
bookRoutes.get("/books/:id", bookController.findOneBook);

export default bookRoutes;
