import express from "express";
const planRoutes = express.Router();

import planController from "../controllers/planController.js";

planRoutes.get("/" , planController.createUser);

export default planRoutes;