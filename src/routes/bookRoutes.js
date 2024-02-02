import express from "express";
const postRoutes = express.Router();

import bookController from "../controllers/bookController.js";

postRoutes.post("/books", bookController.createBook);

export default postRoutes;
