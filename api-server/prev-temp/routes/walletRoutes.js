import express from "express";
const walletRoutes = express.Router();

import walletController from "../controllers/walletController.js";

walletRoutes.get("/:wallet_id" , walletController.getWalletBalance);
walletRoutes.put("/:wallet_id" , walletController.addWalletBalance);

export default walletRoutes;