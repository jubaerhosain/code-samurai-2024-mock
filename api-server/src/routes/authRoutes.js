import express from "express";
const authRoutes = express.Router();

import authController from "../controllers/authController.js";

authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", authController.login);
authRoutes.delete("/logout", authController.logout);

export default authRoutes;
