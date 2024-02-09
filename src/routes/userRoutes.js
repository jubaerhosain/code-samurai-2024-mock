import express from "express";
const userRoutes = express.Router();

import userController from "../controllers/userController.js";

userRoutes.post("/" , userController.createUser);

export default userRoutes;