import express from "express";
const emailRoutes = express.Router();

import emailController from "../controllers/emailController.js";

emailRoutes.post("/", emailController.send);

export default emailRoutes;
