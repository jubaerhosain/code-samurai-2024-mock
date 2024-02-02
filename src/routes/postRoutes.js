import express from "express";
const postRoutes = express.Router();

import postController from "../controllers/postController.js";

postRoutes.post("/posts", postController.createPost);
postRoutes.get("/posts/:id", postController.getPost);

export default postRoutes;
