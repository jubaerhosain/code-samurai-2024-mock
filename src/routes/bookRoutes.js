import express from "express";
const bookRoutes = express.Router();

import bookController from '../controllers/bookController.js';


bookRoutes.get("/books/:id", bookController.getParticularBook);
bookRoutes.post("/books", bookController.addBook);

export default bookRoutes;
