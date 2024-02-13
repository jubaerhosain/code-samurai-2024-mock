import express from "express";
const ticketRoutes = express.Router();

import ticketController from "../controllers/ticketController.js";

ticketRoutes.post("/" , ticketController.purchaseTicket);

export default ticketRoutes;