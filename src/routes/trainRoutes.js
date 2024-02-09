import express from "express";
const trainRoutes = express.Router();

import trainController from "../controllers/trainController.js";

trainRoutes.post("/" , trainController.addTrain);

export default trainRoutes;