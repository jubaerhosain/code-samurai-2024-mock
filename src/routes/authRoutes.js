import express from "express";
const authRoutes = express.Router();

import authController from "../controllers/authController.js";

authRoutes.post("login", authController.login);
authRoutes.post("logout", authController.logout);
authRoutes.put("signup", authController.signup);

export default authRoutes;
