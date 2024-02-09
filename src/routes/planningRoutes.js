import express from "express";
const planningRoutes = express.Router();

import planController from "../controllers/planController.js";

planningRoutes.get("/" , planController.getOptimalRoute);

export default planningRoutes;