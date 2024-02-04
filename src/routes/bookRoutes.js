import express from "express";
const bookRoutes = express.Router();

import bookController from "../controllers/bookController.js";

bookRoutes.post("/" , bookController.createBook);
bookRoutes.put("/:id", bookController.updateBook);
bookRoutes.get("/", bookController.findAllBook);
bookRoutes.get("/:id", bookController.findOneBook);

export default bookRoutes;
