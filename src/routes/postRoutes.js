import express from "express";
const postRoutes = express.Router();

import postController from "../controllers/postController.js";

postRoutes.post("/posts", postController.createPost);

export default postRoutes;
