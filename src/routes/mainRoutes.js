import express from "express";
const mainRoutes = express.Router();

import bookRoutes from "./bookRoutes.js";
import authRoutes from "./authRoutes.js";

mainRoutes.use("/books", bookRoutes);
mainRoutes.use("/auth", authRoutes);

export default mainRoutes;