import express from "express";
const authRoutes = express.Router();

import authController from "./auth.controller.js";

import { schemaValidator } from "../../middlewares/validationMiddleware.js";
import { signUpSchema, loginSchema } from "./auth.validation.schema.js";

authRoutes.post("/signup", schemaValidator(signUpSchema), authController.signup);
authRoutes.post("/login", schemaValidator(loginSchema), authController.login);
authRoutes.delete("/logout", authController.logout);

export default authRoutes;
