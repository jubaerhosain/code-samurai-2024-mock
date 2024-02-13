import express from "express";
const stationRoutes = express.Router();

import stationController from "../controllers/stationController.js";

stationRoutes.post("/" , stationController.addStation);
stationRoutes.get("/" , stationController.getAllStations);
stationRoutes.get("/:station_id/trains" , stationController.getAllTrains);

export default stationRoutes;